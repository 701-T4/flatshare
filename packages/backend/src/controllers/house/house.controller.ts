import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
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
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: DecodedIdToken,
  ) {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);

    if (userDoc.house != undefined) {
      const house = await this.houseStoreService.findOne(userDoc.house);

      if (house != undefined) {
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
          task.house.equals(house.id),
        );

        return {
          tasks: tasksForHouse,
        };
      }
    }

    throw new HttpException('user is not in a house', HttpStatus.BAD_REQUEST);
  }
}
