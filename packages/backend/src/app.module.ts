import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APIController } from './controllers/api.controller';
import { UsersModule } from './controllers/users/users.module';
import { HouseModule } from './controllers/house/house.module';
import { NoteModule } from './controllers/note/note.module';
import { BillModule } from './controllers/bills/bills.module';
import { IssueModule } from './controllers/issues/issues.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TaskModule } from './controllers/tasks/tasks.module';
import { AnnouncementModule } from './controllers/announcements/announcements.module';

@Module({
  controllers: [APIController],
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    HouseModule,
    NoteModule,
    PassportModule,
    BillModule,
    TaskModule,
    IssueModule,
    AnnouncementModule,
  ],
})
export class AppModule {}
