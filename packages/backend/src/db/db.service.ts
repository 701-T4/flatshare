import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Sample, SampleDocument } from './schemas/sample.schema';

@Injectable()
export class SampleService {
  constructor(
    @InjectModel(Sample.name)
    private readonly sampleModel: Model<SampleDocument>,
  ) {}

  async create(createdSampleDto: CreateSampleDto): Promise<Sample> {
    const createdSample = await this.sampleModel.create(createdSampleDto);
    return createdSample;
  }

  async findAll(): Promise<Sample[]> {
    return this.sampleModel.find().exec();
  }

  async findOne(id: string): Promise<Sample> {
    return this.sampleModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.sampleModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
