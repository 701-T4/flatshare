import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { Auth } from '../../util/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import UserResponseDto from './dto/user-response.dto';
import UserTasksResponseDto from './dto/user-tasks-response.dto';
import { TaskStoreService } from '../../db/task/taskStore.service';
import { TaskUtil } from '../tasks/tasks.util';
import { TaskResponseDto } from './dto/task-response-dto';

@ApiTags('users')
@Controller('/api/v1/user')
export class UsersController {
  constructor(
    private readonly userStoreService: UserStoreService,
    private readonly houseStoreService: HouseStoreService,
    private readonly taskStoreService: TaskStoreService,
    private readonly taskUtil: TaskUtil,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create a new user resource',
    description: 'User must be linked to a firebase ID',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userDoc = await this.userStoreService.create(createUserDto);
    const houseDoc = await this.houseStoreService.findOne(userDoc.house);
    return {
      firebaseId: userDoc.firebaseId,
      house: houseDoc.code,
    };
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'get the users information' })
  @ApiOkResponse({
    description: 'returns the user information',
    type: UserResponseDto,
  })
  async currentUser(@User() user: DecodedIdToken): Promise<UserResponseDto> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    const houseDoc = await this.houseStoreService.findOne(userDoc.house);
    return {
      firebaseId: userDoc.firebaseId,
      house: houseDoc?.code,
    };
  }

  @Get('/tasks')
  @Auth()
  @ApiOperation({ summary: 'get all active tasks assigned to a user' })
  @ApiOkResponse({
    description: 'tasks retrieved successfully',
    type: UserTasksResponseDto,
  })
  @ApiBadRequestResponse({ description: 'user is not in a house' })
  async getTasksForUser(
    @User() user: DecodedIdToken,
  ): Promise<UserTasksResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc) {
      const tasks = await this.taskStoreService.findAll();
      const tasksForUser = tasks.filter(
        (task) => task.assigned === userDoc.firebaseId,
      );

      const tasksDue = this.taskUtil.checkRecurrence(tasksForUser);
      const taskPromises = tasksDue.map((task) =>
        this.taskStoreService.update(task.id, task.updatedTask),
      );
      await Promise.all(taskPromises);

      const updatedTasks = await this.taskStoreService.findAll();
      const updatedTasksForUser = updatedTasks.filter(
        (task) => task.assigned === userDoc.firebaseId,
      );

      const updatedTasksDto: TaskResponseDto[] = updatedTasksForUser.map(
        (task) => {
          const { name, description, dueDate, interval, assigned, pool } = task;

          return {
            name,
            description,
            dueDate,
            interval,
            assigned,
            pool,
            isComplete: task.lastCompleted != null,
          };
        },
      );

      return {
        tasks: updatedTasksDto,
      };
    }
    throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
  }
}
