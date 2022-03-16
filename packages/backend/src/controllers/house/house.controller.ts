import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { Auth } from '../../util/auth.decorator';
import { CreateHouseDto } from './dto/create-house.dto';
import HouseResponseDto from './dto/house-response.dto';
import { HouseUtil } from './house.util';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { JoinHouseDto } from './dto/join-house.dto';
import HouseTasksResponseDto from './dto/house-tasks-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStoreService } from '../../db/task/taskStore.service';
import { TaskDocument, TaskModel } from 'src/db/task/task.schema';
import { identity } from 'rxjs';
import { CompleteTaskDto } from './dto/complete-task.dto';
import UpdateHouseTasksDto from './dto/update-house-tasks.dto';
import { isValidObjectId } from 'mongoose';

@ApiTags('houses')
@Controller('/api/v1/house')
@Auth()
export class HouseController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly taskStoreService: TaskStoreService,
    private readonly houseUtil: HouseUtil,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a new house resource' })
  @ApiCreatedResponse({
    description: 'house created successfully',
    type: HouseResponseDto,
  })
  async create(
    @Body() createHouseDto: CreateHouseDto,
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto> {
    createHouseDto.code = this.houseUtil.generateString(8);
    createHouseDto.owner = (
      await this.userStoreService.findOneByFirebaseId(user.uid)
    )._id;
    const house = await this.houseStoreService.create(createHouseDto);
    await this.userStoreService.updateByFirebaseId(user.uid, {
      house: house._id,
    });
    return {
      code: house.code,
      address: house.address,
      email: house.email,
      owner: user.uid,
      name: house.name,
    };
  }

  @Get()
  @ApiOperation({ summary: 'get the currently assigned house' })
  @ApiOkResponse({
    description: 'house retrieved successfully',
    type: HouseResponseDto,
  })
  @ApiNoContentResponse({ description: 'user is not in a house' })
  async getHouse(
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);
      if (house != undefined) {
        return {
          code: house.code,
          address: house.address,
          email: house.email,
          owner: user.uid,
          name: house.name,
        };
      }
    }

    throw new HttpException('user is not in a house', HttpStatus.NO_CONTENT);
  }

  @Put()
  @ApiOperation({ summary: 'join a new house' })
  @ApiOkResponse({
    description: 'house joined successfully',
    type: HouseResponseDto,
  })
  @ApiBadRequestResponse({ description: 'code is invalid' })
  async joinHouse(
    @Body() joinHouseDto: JoinHouseDto,
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto> {
    const house = await this.houseStoreService.findOneByCode(
      joinHouseDto.houseCode,
    );

    if (house != null) {
      await this.userStoreService.updateByFirebaseId(user.uid, {
        house: house._id,
      });
      const owner = await this.userStoreService.findOne(house.owner);

      return {
        code: house.code,
        address: house.address,
        email: house.email,
        owner: owner.firebaseId,
        name: house.name,
      };
    } else throw new HttpException('code is invalid', HttpStatus.BAD_REQUEST);
  }

  @Post('/tasks')
  @ApiOperation({ summary: 'create a new task' })
  @ApiCreatedResponse({
    description: 'task created successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: DecodedIdToken,
  ) {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);

      if (house != undefined) {
        if (createTaskDto.pool.length < 1) {
          throw new HttpException('pool is empty', HttpStatus.BAD_REQUEST);
        }
        createTaskDto.assigned = this.houseUtil.selectRandomUser(
          createTaskDto.pool,
        );
        createTaskDto.house = house._id;
        await this.taskStoreService.create(createTaskDto);

        // 201 code will be returned by default
        return;
      }
    }

    throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
  }

  @Get('/tasks')
  @ApiOperation({ summary: 'get the current tasks from a house' })
  @ApiOkResponse({
    description: 'tasks retrieved successfully',
    type: HouseTasksResponseDto,
  })
  @ApiBadRequestResponse({ description: 'user is not in a house' })
  async getTasksForHouse(
    @User() user: DecodedIdToken,
  ): Promise<HouseTasksResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);

      if (house != undefined) {
        const tasks = await this.taskStoreService.findAll();
        const tasksForHouse = tasks.filter((task) =>
          task.house.equals(house._id),
        );
        const tasks_due = this.houseUtil.checkRecurrence(tasksForHouse);
        tasks_due.forEach(
          async (t) => await this.taskStoreService.update(t.id, t.updatedTask),
        );
        const updated_tasks = await this.taskStoreService.findAll();
        const updated_tasks_for_house = updated_tasks.filter((task) =>
          task.house.equals(house._id),
        );
        return {
          tasks: updated_tasks_for_house,
        };
      }
    }

    throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
  }

  @Delete('/tasks/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete a task from a house.' })
  @ApiNoContentResponse({
    description: 'task successfuly deleted.',
  })
  @ApiBadRequestResponse({
    description: 'user is not the owner of the house',
  })
  async deleteTaskFromHouse(@Param('id') id, @User() user: DecodedIdToken) {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);
      const task = await this.taskStoreService.findOne(id);
      if (house.owner.equals(userDoc._id)) {
        await this.taskStoreService.delete(task._id);

        return 'task deleted successfully';
      }

      throw new HttpException(
        'user is not the owner of the house',
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException('user is not in the house', HttpStatus.BAD_REQUEST);
  }

  @Put('/task/:id/completed')
  @ApiOperation({
    summary: 'mark user as having completed/not completed task.',
  })
  @ApiResponse({
    description: 'tasks successfully marked as complete/not complete.',
  })
  @ApiBadRequestResponse({
    description: 'user is not assigned to the task',
  })
  @ApiNotFoundResponse({
    description: 'task not found',
  })
  async markTaskAsComplete(
    @Body() completeTaskDto: CompleteTaskDto,
    @Param('id') id,
    @User() user: DecodedIdToken,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
    }
    const task = await this.taskStoreService.findOne(id);

    if (task != undefined) {
      if (task.assigned !== user.uid) {
        throw new HttpException(
          'user is not assigned to task',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (completeTaskDto.isComplete) {
        this.taskStoreService.update(task._id, { last_completed: new Date() });
      } else {
        this.taskStoreService.update(task._id, { last_completed: null });
      }
    }
    throw new HttpException('task not found', HttpStatus.NOT_FOUND);
  }

  @Put('/task/:id')
  @ApiOperation({ summary: 'Modify task name, decription or pool' })
  @ApiResponse({
    description: 'task successfuly updated.',
  })
  @ApiBadRequestResponse({
    description: 'user is not the owner of the house or not in the house',
  })
  @ApiBadRequestResponse({
    description: 'task does not exist',
  })
  async modifyTask(
    @Param('id') id,
    @User() user: DecodedIdToken,
    @Body() updateHouseTasksDto: UpdateHouseTasksDto,
  ) {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);
      if (!isValidObjectId(id)) {
        throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
      }
      const task = await this.taskStoreService.findOne(id);
      if (task != undefined) {
        const updatedTask = { ...updateHouseTasksDto, assigned: task.assigned };

        if (!house.owner.equals(userDoc._id)) {
          throw new HttpException(
            'user is not owner of house',
            HttpStatus.BAD_REQUEST,
          );
        }
        updatedTask.assigned =
          updateHouseTasksDto.pool != undefined &&
          !updateHouseTasksDto.pool.includes(task.assigned)
            ? this.houseUtil.selectRandomUser(updateHouseTasksDto.pool)
            : undefined;

        this.taskStoreService.update(task._id, updatedTask);
        return;
      }

      throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('user is not in the house', HttpStatus.BAD_REQUEST);
  }
}
