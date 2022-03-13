import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserSchema } from './user/user.schema';
import { HouseStoreService } from './house/houseStore.service';
import { House, HouseSchema } from './house/house.schema';
import { NoteStoreService } from './note/noteStore.service';
import { Note, NoteSchema } from './note/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [UserStoreService, HouseStoreService, NoteStoreService],
  exports: [
    MongooseModule,
    UserStoreService,
    HouseStoreService,
    NoteStoreService,
  ],
})
export class DbModule {}
