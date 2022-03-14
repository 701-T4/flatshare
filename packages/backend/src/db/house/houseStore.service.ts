import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
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

  async update(
    id: string,
    updateHouseModel: Partial<HouseModel>,
  ): Promise<HouseDocument> {
    return this.HouseModel.findOneAndUpdate(
      { _id: id },
      updateHouseModel,
    ).exec();
  }

  async delete(id: string) {
    return this.HouseModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
