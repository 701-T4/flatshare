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
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { Auth } from '../../util/auth.decorator';
import { TaskUtil } from './tasks.util';
import { User } from '../../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import HouseTasksResponseDto from './dto/house-tasks-response.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStoreService } from '../../db/task/taskStore.service';
import { CompleteTaskDto } from './dto/complete-task.dto';
import UpdateHouseTasksDto from './dto/update-house-tasks.dto';
import { isValidObjectId } from 'mongoose';
import { TaskResponseDto } from './dto/task-response-dto';

@ApiTags('tasks')
@Controller('/api/v1/house/tasks')
@Auth()
export class TasksController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly taskStoreService: TaskStoreService,
    private readonly taskUtil: TaskUtil,
  ) {}

  @Post()
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
    if (!userDoc.house) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

    const house = await this.houseStoreService.findOne(userDoc.house);
    if (house) {
      if (createTaskDto.pool.length < 1) {
        throw new HttpException('pool is empty', HttpStatus.BAD_REQUEST);
      }

      createTaskDto.assigned = this.taskUtil.selectRandomUser(
        createTaskDto.pool,
      );
      createTaskDto.house = house._id;

      await this.taskStoreService.create(createTaskDto);
    }
  }

  @Get()
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
    if (!userDoc.house) {
      throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
    }

    const house = await this.houseStoreService.findOne(userDoc.house);
    if (house) {
      const tasks = await this.taskStoreService.findAll();

      const tasksForHouse = tasks.filter((task) =>
        task.house.equals(house._id),
      );

      const tasksDue = this.taskUtil.checkRecurrence(tasksForHouse);
      const taskPromises = tasksDue.map((task) =>
        this.taskStoreService.update(task.id, task.updatedTask),
      );
      await Promise.all(taskPromises);

      const updatedTasks = await this.taskStoreService.findAll();
      const updatedTasksForHouse = updatedTasks.filter((task) =>
        task.house.equals(house._id),
      );

      const updatedTasksDto: TaskResponseDto[] = updatedTasksForHouse.map(
        (task) => {
          const {
            name,
            description,
            lastCompleted,
            dueDate,
            interval,
            assigned,
            pool,
            house,
          } = task;

          return {
            name,
            description,
            lastCompleted,
            dueDate,
            interval,
            assigned,
            pool,
            house,
            isComplete: task.lastCompleted != null,
          };
        },
      );
      return {
        tasks: updatedTasksDto,
      };
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id for the task to delete',
  })
  @ApiOperation({ summary: 'delete a task from a house.' })
  @ApiNoContentResponse({
    description: 'task successfully deleted.',
  })
  @ApiForbiddenResponse({
    description: 'user is not the owner of the house',
  })
  @ApiNotFoundResponse({
    description: 'task not found',
  })
  async deleteTaskFromHouse(@Param('id') id, @User() user: DecodedIdToken) {
    if (!isValidObjectId(id)) {
      throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
    }

    const task = await this.taskStoreService.findOne(id);
    if (!task) {
      throw new HttpException('task not found', HttpStatus.NOT_FOUND);
    }

    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (!userDoc.house) {
      throw new HttpException(
        'user is not in the house',
        HttpStatus.BAD_REQUEST,
      );
    }

    const house = await this.houseStoreService.findOne(userDoc.house);
    if (!house.owner.equals(userDoc._id)) {
      throw new HttpException(
        'user is not the owner of the house',
        HttpStatus.FORBIDDEN,
      );
    }

    this.taskStoreService.delete(task._id);
  }

  @Put('/:id/completed')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id for the task to mark as complete or not',
  })
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
    if (!task) {
      throw new HttpException('task not found', HttpStatus.NOT_FOUND);
    }

    if (task.assigned !== user.uid) {
      throw new HttpException(
        'user is not assigned to task',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (completeTaskDto.isComplete) {
      this.taskStoreService.update(task._id, { lastCompleted: new Date() });
    } else {
      this.taskStoreService.update(task._id, { lastCompleted: null });
    }
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the task to update',
  })
  @ApiOperation({ summary: 'Modify task name, decription or pool' })
  @ApiResponse({
    description: 'task successfuly updated.',
  })
  @ApiForbiddenResponse({
    description: 'user is not the owner of the house or not in the house',
  })
  @ApiNotFoundResponse({
    description: 'task does not exist',
  })
  async modifyTask(
    @Param('id') id,
    @User() user: DecodedIdToken,
    @Body() updateHouseTasksDto: UpdateHouseTasksDto,
  ) {
    if (!isValidObjectId(id)) {
      throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
    }

    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    if (!userDoc.house) {
      throw new HttpException(
        'user is not in the house',
        HttpStatus.BAD_REQUEST,
      );
    }

    const house = await this.houseStoreService.findOne(userDoc.house);
    const task = await this.taskStoreService.findOne(id);
    if (task) {
      const updatedTask = { ...updateHouseTasksDto, assigned: task.assigned };

      if (!house.owner.equals(userDoc._id)) {
        throw new HttpException(
          'user is not owner of house',
          HttpStatus.FORBIDDEN,
        );
      }

      updatedTask.assigned =
        updateHouseTasksDto.pool != undefined &&
        !updateHouseTasksDto.pool.includes(task.assigned)
          ? this.taskUtil.selectRandomUser(updateHouseTasksDto.pool)
          : undefined;

      this.taskStoreService.update(task._id, updatedTask);
      return;
    }

    throw new HttpException('task does not exist', HttpStatus.NOT_FOUND);
  }
}
