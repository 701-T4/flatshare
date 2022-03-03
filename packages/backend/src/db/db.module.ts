import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SampleController } from './db.controller';
import { SampleService } from './db.service';
import { Sample, SampleSchema } from './schemas/sample.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
  ],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
