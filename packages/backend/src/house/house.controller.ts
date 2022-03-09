import { Controller, Post, Body, Param } from '@nestjs/common';
import { HouseStoreService } from '../db/house/houseStore.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UserStoreService } from 'src/db/user/userStore.service';

@Controller('/api/v1/house')
export class HouseController {
  constructor(private readonly houseStoreService: HouseStoreService) {}

  @Post()
  async create(@Body() createHouseDto: CreateHouseDto) {
    const code = generateString(8);
    createHouseDto.code = code;
    // const user = await this.userStoreService.findOne(userId);
    // if ( createHouseDto.users === undefined){
    //   createHouseDto.users = [];
    // }
    // createHouseDto.users.push(user);
    return await this.houseStoreService.create(createHouseDto);
  }
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
