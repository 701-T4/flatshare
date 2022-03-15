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
import UserResponseDto from '../users/dto/user-response.dto';
import { Types } from 'mongoose';

@ApiTags('houses')
@Controller('/api/v1/house')
@Auth()
export class HouseController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
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
    const owner = await this.userStoreService.findOneByFirebaseId(user.uid);
    createHouseDto.owner = owner._id;
    const userList: Array<Types.ObjectId> = [];
    userList.push(owner._id);
    createHouseDto.users = userList;
    const house = await this.houseStoreService.create(createHouseDto);
    await this.userStoreService.updateByFirebaseId(user.uid, {
      house: house._id,
    });
    const userSet: Array<UserResponseDto> = [];
    const userDto = {
      house: house.code,
      firebaseId: owner.firebaseId,
    };
    userSet.push(userDto);
    return {
      code: house.code,
      address: house.address,
      email: house.email,
      owner: user.uid,
      name: house.name,
      users: userSet,
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
      // const userList = await this.houseStoreService.getUserDto(house);
      const userList: Array<UserResponseDto> = [];
      for (const id of house.users) {
        const user = await this.userStoreService.findOne(id);
        const userDto = {
          house: house.code,
          firebaseId: user.firebaseId,
        };
        userList.push(userDto);
      }
      if (house != undefined) {
        return {
          code: house.code,
          address: house.address,
          email: house.email,
          owner: user.uid,
          name: house.name,
          users: userList,
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
    const addedUser = await this.userStoreService.findOneByFirebaseId(user.uid);
    const house = await this.houseStoreService.findOneByCode(
      joinHouseDto.houseCode,
    );
    if (house != null) {
      house.users.push(addedUser._id);
      await this.userStoreService.updateByFirebaseId(user.uid, {
        house: house._id,
      });
      await this.houseStoreService.update(house.id, {
        users: house.users,
      });
      const owner = await this.userStoreService.findOne(house.owner);
      const userList: Array<UserResponseDto> = [];
      for (const id of house.users) {
        const user = await this.userStoreService.findOne(id);
        const userDto = {
          house: house.code,
          firebaseId: user.firebaseId,
        };
        userList.push(userDto);
      }
      return {
        code: house.code,
        address: house.address,
        email: house.email,
        owner: owner.firebaseId,
        name: house.name,
        users: userList,
      };
    } else throw new HttpException('code is invalid', HttpStatus.BAD_REQUEST);
  }
}
