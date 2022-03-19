/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument, TaskModel } from './task.schema';

@Injectable()
export class TaskStoreService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {
    mongoose.set('sanitizeFilter', true);
  }

  async create(createdTaskModel: TaskModel): Promise<TaskDocument> {
    return this.taskModel.create(createdTaskModel);
  }

  async findOne(id: string | mongoose.Types.ObjectId): Promise<TaskDocument> {
    return this.taskModel.findOne({ _id: id }).exec();
  }

  async findAllByHouse(
    houseId: string | mongoose.Types.ObjectId,
  ): Promise<TaskDocument[]> {
    return this.taskModel
      .find()
      .populate({ path: 'house', match: { _id: houseId } })
      .exec();
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async update(
    id: string,
    updateTaskModel: Partial<TaskModel>,
  ): Promise<TaskDocument> {
    return this.taskModel.findOneAndUpdate({ _id: id }, updateTaskModel).exec();
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndRemove({ _id: id }).exec();
  }
}
