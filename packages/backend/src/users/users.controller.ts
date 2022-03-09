import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { UserModel } from 'src/db/user/user.schema';
import { UserStoreService } from '../db/user/userStore.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly userStoreService: UserStoreService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userStoreService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userStoreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userStoreService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userStoreService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStoreService.delete(id);
  }

  @Get('house/:userId')
  async getHouse(@Param('userId') userId: string) {
    const user = await this.userStoreService.findOne(userId);
    return user.house;
  }

  @Put('house/:userId/:houseCode')
  async joinHouse(
    @Param('userId') userId: string,
    @Param('houseCode') houseCode: string,
  ) {
    return this.userStoreService.joinHouse(houseCode, userId);
    //const house = await this.userStoreService.findHouse(user.house_id);
  }
}
