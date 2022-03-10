import { Controller, Post, Body, Param, Get, Put, Query } from '@nestjs/common';
import { UserStoreService } from '../db/user/userStore.service';
import { HouseStoreService } from '../db/house/houseStore.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { HouseUtil } from './house.util';

@Controller('/api/v1/house')
export class HouseController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly houseUtil: HouseUtil,
  ) {}

  @Post()
  async create(
    @Body() createHouseDto: CreateHouseDto,
    @Query('firebaseId') firebaseId: string,
  ) {
    const code = this.houseUtil.generateString(8);
    createHouseDto.code = code;
    const house = await this.houseStoreService.create(createHouseDto);
    this.userStoreService.updateByFirebaseId(firebaseId, { house: house._id });
    return house;
  }

  @Get()
  async getHouse(@Query('userId') userId: string) {
    const user = await this.userStoreService.findOne(userId);
    return user.house;
  }

  @Put()
  async joinHouse(
    @Query('firebaseId') firebaseId: string,
    @Query('houseCode') houseCode: string,
  ) {
    const house = await this.houseStoreService.findOneByCode(houseCode);
    this.userStoreService.updateByFirebaseId(firebaseId, { house: house._id });
  }
}
