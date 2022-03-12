import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
  async getHouse(
    @User() user: DecodedIdToken,
  ): Promise<HouseResponseDto | null> {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    const house = await this.houseStoreService.findOne(userDoc.house);
    if (house) {
      return {
        code: house.code,
        address: house.address,
        email: house.email,
        owner: user.uid,
        name: house.name,
      };
    } else {
      return null;
    }
  }

  @Put()
  @ApiOperation({ summary: 'join a new house' })
  @ApiOkResponse({
    description: 'house joined successfully',
    type: HouseResponseDto,
  })
  @ApiNotFoundResponse({ description: 'house not found' })
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
    } else
      throw new HttpException(
        'the house could not be found',
        HttpStatus.NOT_FOUND,
      );
  }
}
