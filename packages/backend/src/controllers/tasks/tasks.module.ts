import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { DbModule } from '../../db/db.module';
import { TaskUtil } from './tasks.util';

@Module({
  controllers: [TasksController],
  imports: [DbModule],
  providers: [TaskUtil],
})
export class TaskModule {}
