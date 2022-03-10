import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserStoreService } from '../db/user/userStore.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
}
