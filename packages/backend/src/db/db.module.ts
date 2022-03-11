import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserSchema } from './user/user.schema';
import { HouseStoreService } from './house/houseStore.service';
import { House, HouseSchema } from './house/house.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
  ],
  providers: [UserStoreService, HouseStoreService],
  exports: [MongooseModule, UserStoreService, HouseStoreService],
})
export class DbModule {}
