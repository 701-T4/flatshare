import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SampleService } from './sample/sample.service';
import { Sample, SampleSchema } from './sample/sample.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
  ],
  providers: [SampleService],
})
export class SampleModule {}
