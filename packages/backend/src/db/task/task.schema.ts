import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ required: false })
  last_completed: Date;

  @Prop()
  due_date: Date;

  @Prop()
  interval: number;

  @Prop()
  assigned: string;

  @Prop()
  pool: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'House' })
  house: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export class TaskModel {
  name: string;
  description: string;
  last_completed: Date;
  due_date: Date;
  interval: number;
  assigned?: string;
  pool?: string[];
  house?: Types.ObjectId;
}
