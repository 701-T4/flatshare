import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House, HouseDocument, HouseModel } from './house.schema';

@Injectable()
export class HouseStoreService {
  constructor(
    @InjectModel(House.name)
    private readonly HouseModel: Model<HouseDocument>,
  ) {}

  async create(createdHouseModel: HouseModel): Promise<House> {
    const createdHouse = await this.HouseModel.create(createdHouseModel);
    return createdHouse;
  }

  async findOne(id: string): Promise<House> {
    return this.HouseModel.findOne({ _id: id }).exec();
  }

  async findOneByCode(code: string): Promise<House> {
    return this.HouseModel.findOne({ code: code }).exec();
  }

  async findAll(): Promise<House[]> {
    return this.HouseModel.find().exec();
  }

  async update(
    id: string,
    updateHouseModel: Partial<HouseModel>,
  ): Promise<House> {
    return this.HouseModel.findOneAndUpdate(
      { _id: id },
      updateHouseModel,
    ).exec();
  }

  async delete(id: string) {
    const deletedHouse = await this.HouseModel.findByIdAndRemove({
      _id: id,
    }).exec();
    return deletedHouse;
  }
}
