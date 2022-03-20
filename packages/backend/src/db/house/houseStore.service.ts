import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import UserResponseDto from '../../controllers/users/dto/user-response.dto';
import { House, HouseDocument, HouseModel } from './house.schema';

@Injectable()
export class HouseStoreService {
  constructor(
    @InjectModel(House.name)
    private readonly HouseModel: Model<HouseDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  async create(createdHouseModel: HouseModel): Promise<HouseDocument> {
    return this.HouseModel.create(createdHouseModel);
  }

  async findOne(id: string | Mongoose.Types.ObjectId): Promise<HouseDocument> {
    return this.HouseModel.findOne({ _id: id }).exec();
  }

  async findOneByCode(code: string): Promise<HouseDocument> {
    return this.HouseModel.findOne({ code: code }).exec();
  }

  async findAll(): Promise<HouseDocument[]> {
    return this.HouseModel.find().exec();
  }

  async getUserDto(
    id: string | Mongoose.Types.ObjectId,
  ): Promise<UserResponseDto[]> {
    const house = await this.HouseModel.findOne({ _id: id })
      .populate('users')
      .exec();
    const userList: Array<UserResponseDto> = [];
    for (const user of house.users) {
      const userDto = {
        name: user['name'],
        house: house.code,
        firebaseId: user['firebaseId'],
      };
      userList.push(userDto);
    }
    return userList;
  }

  async update(
    id: string,
    updateHouseModel: Partial<HouseModel>,
  ): Promise<HouseDocument> {
    return this.HouseModel.findOneAndUpdate(
      { _id: id },
      updateHouseModel,
    ).exec();
  }

  async delete(id: string): Promise<HouseDocument> {
    return this.HouseModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
