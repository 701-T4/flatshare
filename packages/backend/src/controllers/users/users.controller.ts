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
import { Task } from 'src/db/task/task.schema';
import { TaskStoreService } from 'src/db/task/taskStore.service';
import { Console } from 'console';

@ApiTags('users')
@Controller('/api/v1/user')
export class UsersController {
  constructor(
    private readonly userStoreService: UserStoreService,
    private readonly houseStoreService: HouseStoreService,
    private readonly taskStoreService: TaskStoreService,
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
  @ApiBadRequestResponse({ description: 'user does not exist' })
  async getTasksForUser(
    @User() user: DecodedIdToken,
  ): Promise<UserTasksResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc != undefined) {
      const tasks = await this.taskStoreService.findAll();
      const tasksForUser = tasks.filter(
        (task) => task.assigned === userDoc.firebaseId,
      );
      console.log(tasks);
      console.log(tasksForUser);
      return {
        tasks: tasksForUser,
      };
    }
    throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
  }
}
