import { Module } from '@nestjs/common';
import { IssueController } from './issues.controller';
import { DbModule } from '../../db/db.module';
import { FirebaseAuthStrategy } from '../../guards/firebase.auth';
import { IssueUtil } from './issues.util';

/**
 * The issues module is responsible for registering which components
 * are shared within this module through the providers and registering
 * the controller that will be used for handling Issue-related requests.
 * The imports include modules that this module depends on.
 */
@Module({
  controllers: [IssueController],
  imports: [DbModule],
  providers: [IssueUtil, FirebaseAuthStrategy],
})
export class IssueModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
