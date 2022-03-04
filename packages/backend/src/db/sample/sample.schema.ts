import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SampleDocument = Sample & Document;

@Schema()
export class Sample {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const SampleSchema = SchemaFactory.createForClass(Sample);

export class SampleModel {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
