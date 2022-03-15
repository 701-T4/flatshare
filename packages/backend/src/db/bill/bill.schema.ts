import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BillDocument = Bill & Document;

@Schema()
export class Bill {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop()
  due: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  users: {
    id: Types.ObjectId;
    amount: number;
    paid: boolean;
    proof: string;
  }[];
}

export const BillSchema = SchemaFactory.createForClass(Bill);

export class BillModel {
  name: string;
  description: string;
  owner: Types.ObjectId;
  due: Date;
  users: {
    id: Types.ObjectId;
    amount: number;
    paid: boolean;
    proof: string;
  }[];
}
