import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserSchema } from './user/user.schema';
import { HouseStoreService } from './house/houseStore.service';
import { House, HouseSchema } from './house/house.schema';
import { TaskStoreService } from './task/taskStore.service';
import { Task, TaskSchema } from './task/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [UserStoreService, HouseStoreService, TaskStoreService],
  exports: [
    MongooseModule,
    UserStoreService,
    HouseStoreService,
    TaskStoreService,
  ],
})
export class DbModule {}
