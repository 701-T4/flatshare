import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserStoreService } from '../db/user/userStore.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
