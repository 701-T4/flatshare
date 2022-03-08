import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [HouseController],
  imports: [DbModule],
})
export class HouseModule {}
