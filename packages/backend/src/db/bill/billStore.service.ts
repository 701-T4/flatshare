import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Bill, BillDocument, BillModel } from './bill.schema';

@Injectable()
export class BillStoreService {
  constructor(
    @InjectModel(Bill.name)
    private readonly BillModel: Model<BillDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  async create(createdBillModel: BillModel): Promise<BillDocument> {
    return this.BillModel.create(createdBillModel);
  }

  async findOne(id: string | Mongoose.Types.ObjectId): Promise<BillDocument> {
    return this.BillModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<BillDocument[]> {
    return this.BillModel.find().exec();
  }

  async findAllForHouse(id: Mongoose.Types.ObjectId): Promise<BillDocument[]> {
    return this.BillModel.find({ house: id }).exec();
  }

  async update(
    id: string,
    updateBillModel: Partial<BillModel>,
  ): Promise<BillDocument> {
    return this.BillModel.findOneAndUpdate({ _id: id }, updateBillModel).exec();
  }

  async delete(id: string): Promise<BillDocument> {
    return this.BillModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
