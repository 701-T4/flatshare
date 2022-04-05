import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import {
  Announcement,
  AnnouncementDocument,
  AnnouncementModel,
} from './announcement.schema';

/**
 * The announcementStore.service class contains methods that interact with
 * the Mongo database. These methods should be used in the controller classes
 * to perform DB interactions.
 */
@Injectable()
export class AnnouncementStoreService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly AnnouncementModel: Model<AnnouncementDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  /**
   * Create an announcement for the supplied model
   * @param createdAnnouncementModel
   * @returns The created Announcement document
   */
  async create(
    createdAnnouncementModel: AnnouncementModel,
  ): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.create(createdAnnouncementModel);
  }

  /**
   * Find an Announcement by its Id
   * @param id
   * @returns The found Announcement document
   */
  async findOne(
    id: string | Mongoose.Types.ObjectId,
  ): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findOne({ _id: id }).exec();
  }

  /**
   * Retrieve all announcements
   * @returns The found Announcement documents
   */
  async findAll(): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find().exec();
  }

  /**
   * Retrieve all announcements with the given house code
   * @param houseCode
   * @returns The found Announcement documents with the specified house code
   */
  async findAllByHouseCode(houseCode: string): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find({ houseCode: houseCode }).exec();
  }

  /**
   * Delete the announcement with the supplied Id.
   * @param id
   * @returns
   */
  async delete(id: string): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
