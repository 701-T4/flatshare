import { Module } from '@nestjs/common';
import { BillController } from './bills.controller';
import { DbModule } from '../../db/db.module';
import { FirebaseAuthStrategy } from '../../guards/firebase.auth';
import { BillUtil } from './bills.util';

@Module({
  controllers: [BillController],
  imports: [DbModule],
  providers: [BillUtil, FirebaseAuthStrategy],
})
export class BillModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
