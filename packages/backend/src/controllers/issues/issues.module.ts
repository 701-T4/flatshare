import { Module } from '@nestjs/common';
import { IssueController } from './issues.controller';
import { DbModule } from '../../db/db.module';
import { FirebaseAuthStrategy } from '../../guards/firebase.auth';
import { IssueUtil } from './issues.util';

@Module({
  controllers: [IssueController],
  imports: [DbModule],
  providers: [IssueUtil, FirebaseAuthStrategy],
})
export class BillModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
