import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcements.controller';
import { DbModule } from '../../db/db.module';
import { FirebaseAuthStrategy } from '../../guards/firebase.auth';
import { AnnouncementUtil } from './announcements.util';

@Module({
  controllers: [AnnouncementController],
  imports: [DbModule],
  providers: [AnnouncementUtil, FirebaseAuthStrategy],
})
export class AnnouncementModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
