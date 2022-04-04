import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiConflictResponse,
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
import UpdateUserDto from './dto/update-user.dto';

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
    summary: 'Create a new user resource',
    description: 'User must be linked to a firebase ID',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUserDoc = await this.userStoreService.findOneByFirebaseId(
      createUserDto.firebaseId,
    );
    if (existingUserDoc) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
    const createdUserDoc = await this.userStoreService.create({
      name: createUserDto.name,
      firebaseId: createUserDto.firebaseId,
      rentPercentage: 0,
      contact: '',
      dateJoined: null,
      contractEndingDate: null,
    });
    const houseDoc = await this.houseStoreService.findOne(createdUserDoc.house);

    return {
      name: createdUserDoc.name,
      firebaseId: createdUserDoc.firebaseId,
      house: houseDoc?.code,
      rentPercentage: createdUserDoc.rentPercentage,
      contact: createdUserDoc.contact,
      dateJoined: createdUserDoc.dateJoined,
      contractEndingDate: createdUserDoc.contractEndingDate,
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
      name: userDoc.name,
      firebaseId: userDoc.firebaseId,
      house: houseDoc?.code,
      rentPercentage: userDoc.rentPercentage,
      contact: userDoc.contact,
      dateJoined: userDoc.dateJoined,
      contractEndingDate: userDoc.contractEndingDate,
    };
  }

  @Put()
  @Auth()
  @ApiOperation({ summary: 'update details for a user' })
  @ApiOkResponse({
    description: 'user details updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'user details are invalid' })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (updateUserDto.firebaseId != null) {
      const percentageLimit = 100;
      let userDoc = await this.userStoreService.findOneByFirebaseId(
        updateUserDto.firebaseId,
      );
      if (userDoc != null) {
        await this.userStoreService.update(updateUserDto.firebaseId, {
          name: updateUserDto.name,
          contact: updateUserDto.contact,
        });

        if (updateUserDto.rentPercentage != null) {
          if (
            updateUserDto.rentPercentage <= percentageLimit &&
            updateUserDto.rentPercentage >= 0
          ) {
            await this.userStoreService.update(updateUserDto.firebaseId, {
              rentPercentage: updateUserDto.rentPercentage,
            });
          } else {
            throw new HttpException(
              'rent percentage is invalid, please make sure 0 <= rentPercentage <= 100',
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        if (updateUserDto.dateJoined != null) {
          if (!isNaN(new Date(updateUserDto.dateJoined).getTime())) {
            await this.userStoreService.update(updateUserDto.firebaseId, {
              dateJoined: updateUserDto.dateJoined,
            });
          } else {
            throw new HttpException(
              'dateJoined is invalid',
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        if (updateUserDto.contractEndingDate != null) {
          if (!isNaN(new Date(updateUserDto.contractEndingDate).getTime())) {
            await this.userStoreService.update(updateUserDto.firebaseId, {
              contractEndingDate: updateUserDto.contractEndingDate,
            });
          } else {
            throw new HttpException(
              'contractEndingDate is invalid',
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        userDoc = await this.userStoreService.findOneByFirebaseId(
          updateUserDto.firebaseId,
        );
        const houseDoc = await this.houseStoreService.findOne(userDoc.house);
        return {
          name: userDoc.name,
          firebaseId: userDoc.firebaseId,
          house: houseDoc?.code,
          rentPercentage: userDoc.rentPercentage,
          contact: userDoc.contact,
          dateJoined: userDoc.dateJoined,
          contractEndingDate: userDoc.contractEndingDate,
        };
      } else {
        throw new HttpException(
          'failed to update user details',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'user firebaseId is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
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
      await Promise.all(
        tasksDue.map((task) =>
          this.taskStoreService.update(task.id, task.updatedTask),
        ),
      );

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
