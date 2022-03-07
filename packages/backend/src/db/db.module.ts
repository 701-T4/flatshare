import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserModel, UserSchema } from './user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserStoreService],
  exports: [MongooseModule, UserStoreService],
})
export class DbModule {}
