import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserModel } from './user.schema';
import { HouseStoreService } from '../house/houseStore.service';

@Injectable()
export class UserStoreService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private houseStoreService: HouseStoreService,
  ) {}

  async create(createdUserModel: UserModel): Promise<User> {
    const createdUser = await this.userModel.create(createdUserModel);
    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserModel: Partial<UserModel>): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserModel).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }

  async joinHouse(house_code: string, id: string) {
    const house = await this.houseStoreService.findOneByCode(house_code);
    this.update(id, house);
  }
}
