import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserStoreService } from '../db/user/userStore.service';
import { HouseStoreService } from '../db/house/houseStore.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { HouseUtil } from './house.util';
import { FirebaseGuard } from '../guards/firebase.guard';
import { User } from '../util/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { JoinHouseDto } from './dto/join-house.dto';

@Controller('/api/v1/house')
@UseGuards(FirebaseGuard)
export class HouseController {
  constructor(
    private readonly houseStoreService: HouseStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly houseUtil: HouseUtil,
  ) {}

  @Post()
  async create(
    @Body() createHouseDto: CreateHouseDto,
    @User() user?: DecodedIdToken,
  ) {
    createHouseDto.code = this.houseUtil.generateString(8);
    createHouseDto.owner = (
      await this.userStoreService.findOneByFirebaseId(user.uid)
    )._id;
    const house = await this.houseStoreService.create(createHouseDto);
    await this.userStoreService.updateByFirebaseId(user.uid, {
      house: house._id,
    });
    return house;
  }

  @Get()
  async getHouse(@User() user?: DecodedIdToken) {
    const userDoc = await this.userStoreService.findOneByFirebaseId(user.uid);
    return userDoc.house;
  }

  @Put()
  async joinHouse(
    @Body() joinHouseDto: JoinHouseDto,
    @User() user?: DecodedIdToken,
  ) {
    const house = await this.houseStoreService.findOneByCode(
      joinHouseDto.houseCode,
    );
    await this.userStoreService.updateByFirebaseId(user.uid, {
      house: house._id,
    });
  }
}
