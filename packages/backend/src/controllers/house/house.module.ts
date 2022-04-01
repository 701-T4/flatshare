import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { DbModule } from '../../db/db.module';
import { HouseUtil } from './house.util';
import { AnnouncementUtil } from '../announcements/announcements.util';
import { FirebaseAuthStrategy } from '../../guards/firebase.auth';

@Module({
  controllers: [HouseController],
  imports: [DbModule],
  providers: [HouseUtil, AnnouncementUtil, FirebaseAuthStrategy],
})
export class HouseModule {}
