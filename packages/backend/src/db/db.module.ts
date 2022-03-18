import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserSchema } from './user/user.schema';
import { HouseStoreService } from './house/houseStore.service';
import { House, HouseSchema } from './house/house.schema';
import { BillStoreService } from './bill/billStore.service';
import { Bill, BillSchema } from './bill/bill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  providers: [UserStoreService, HouseStoreService, BillStoreService],
  exports: [
    MongooseModule,
    UserStoreService,
    HouseStoreService,
    BillStoreService,
  ],
})
export class DbModule {}
