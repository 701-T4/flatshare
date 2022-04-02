import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument, NoteModel } from './note.schema';

@Injectable()
export class NoteStoreService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
  ) {
    Mongoose.set('sanitizeFilter', true);
  }

  async create(createdNoteModel: NoteModel): Promise<NoteDocument> {
    return this.noteModel.create(createdNoteModel);
  }

  async findOne(id: string | Mongoose.Types.ObjectId): Promise<NoteDocument> {
    return this.noteModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<NoteDocument[]> {
    return this.noteModel.find().exec();
  }

  async findAllByHouse(
    houseId: string | Mongoose.Types.ObjectId,
  ): Promise<NoteDocument[]> {
    return this.noteModel.find({ house: houseId }).exec();
  }

  async update(
    id: string,
    updateNoteModel: Partial<NoteModel>,
  ): Promise<NoteDocument> {
    return this.noteModel
      .findOneAndUpdate({ _id: id }, updateNoteModel, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<NoteDocument> {
    return this.noteModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
  }
}
