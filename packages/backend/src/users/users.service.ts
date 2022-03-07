import { Injectable } from '@nestjs/common';
import { UserStoreService } from '../db/user/userStore.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private userStoreService: UserStoreService) {}

  async create(createUserDto: CreateUserDto) {
    await this.userStoreService.create(createUserDto);
  }

  async findAll() {
    await this.userStoreService.findAll();
  }

  async findOne(id: number) {
    await this.userStoreService.findOne(`${id}`);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
