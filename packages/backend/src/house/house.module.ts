import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { DbModule } from '../db/db.module';
import { HouseUtil } from './house.util';

@Module({
  controllers: [HouseController],
  imports: [DbModule],
  providers: [HouseUtil],
})
export class HouseModule {}
