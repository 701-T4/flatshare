import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserModel } from './user.schema';

@Injectable()
export class UserStoreService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    mongoose.set('sanitizeFilter', true);
  }

  async create(createdUserModel: UserModel): Promise<UserDocument> {
    return this.userModel.create(createdUserModel);
  }

  async findOne(id: string | mongoose.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByFirebaseId(firebaseId: string): Promise<UserDocument> {
    return this.userModel.findOne({ firebaseId: firebaseId }).exec();
  }

  async update(
    id: string,
    updateUserModel: Partial<UserModel>,
  ): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserModel).exec();
  }

  async updateByFirebaseId(
    firebaseId: string,
    updateUserModel: Partial<UserModel>,
  ): Promise<UserDocument> {
    return this.userModel
      .findOneAndUpdate({ firebaseId: firebaseId }, updateUserModel)
      .exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
