import { Module } from '@nestjs/common';
import { BillController } from './bills.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [BillController],
  imports: [DbModule],
})
export class BillModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
