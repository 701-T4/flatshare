import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { DbModule } from '../../db/db.module';
import { HouseUtil } from './house.util';
import { FirebaseAuthStrategy } from 'src/guards/firebase.auth';

@Module({
  controllers: [HouseController],
  imports: [DbModule],
  providers: [HouseUtil, FirebaseAuthStrategy],
})
export class HouseModule {}
