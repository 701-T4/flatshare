import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Issue, IssueDocument, IssueModel } from './issue.schema';

@Injectable()
export class IssueStoreService {
  constructor(
    @InjectModel(Issue.name)
    private readonly IssueModel: Model<IssueDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  async create(createdIssueModel: IssueModel): Promise<IssueDocument> {
    return this.IssueModel.create(createdIssueModel);
  }

  async findOne(id: string | Mongoose.Types.ObjectId): Promise<IssueDocument> {
    return this.IssueModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<IssueDocument[]> {
    return this.IssueModel.find().exec();
  }

  async findAllForHouse(id: Mongoose.Types.ObjectId): Promise<IssueDocument[]> {
    return this.IssueModel.find({ house: id }).exec();
  }

  async update(
    id: string,
    updateIssueModel: Partial<IssueModel>,
  ): Promise<IssueDocument> {
    return this.IssueModel.findOneAndUpdate({ _id: id }, updateIssueModel, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<IssueDocument> {
    return this.IssueModel.findByIdAndRemove({
      _id: id,
    }).exec();
  }
}
