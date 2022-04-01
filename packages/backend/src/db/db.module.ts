import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user/userStore.service';
import { User, UserSchema } from './user/user.schema';
import { HouseStoreService } from './house/houseStore.service';
import { House, HouseSchema } from './house/house.schema';
import { TaskStoreService } from './task/taskStore.service';
import { Task, TaskSchema } from './task/task.schema';
import { NoteStoreService } from './note/noteStore.service';
import { Note, NoteSchema } from './note/note.schema';
import { BillStoreService } from './bill/billStore.service';
import { Bill, BillSchema } from './bill/bill.schema';
import { Issue, IssueSchema } from './issue/issue.schema';
import { IssueStoreService } from './issue/issueStore.service';
import {
  Announcement,
  AnnouncementSchema,
} from './announcement/announcement.schema';
import { AnnouncementStoreService } from './announcement/announcementStore.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]),
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
  ],
  providers: [
    UserStoreService,
    HouseStoreService,
    BillStoreService,
    NoteStoreService,
    TaskStoreService,
    IssueStoreService,
    AnnouncementStoreService,
  ],
  exports: [
    MongooseModule,
    UserStoreService,
    HouseStoreService,
    TaskStoreService,
    BillStoreService,
    NoteStoreService,
    IssueStoreService,
    AnnouncementStoreService,
  ],
})
export class DbModule {}
