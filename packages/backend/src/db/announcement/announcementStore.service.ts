import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  Announcement,
  AnnouncementDocument,
  AnnouncementModel,
} from './announcement.schema';

@Injectable()
export class AnnouncementStoreService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly AnnouncementModel: Model<AnnouncementDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  async create(
    createdAnnouncementModel: AnnouncementModel,
  ): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.create(createdAnnouncementModel);
  }

  async findOne(
    id: string | Mongoose.Types.ObjectId,
  ): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find().exec();
  }

  async findAllByHouseCode(houseCode: string): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find({ houseCode: houseCode }).exec();
  }

  async delete(id: string): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
