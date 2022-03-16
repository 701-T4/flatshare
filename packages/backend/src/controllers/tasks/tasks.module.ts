import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { DbModule } from '../../db/db.module';
import { TaskUtil } from './tasks.util';
import { FirebaseAuthStrategy } from 'src/guards/firebase.auth';

@Module({
  controllers: [TasksController],
  imports: [DbModule],
  providers: [TaskUtil, FirebaseAuthStrategy],
})
export class TaskModule {}
