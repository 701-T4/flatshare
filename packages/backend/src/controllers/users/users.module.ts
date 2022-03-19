import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbModule } from '../../db/db.module';
import { TaskUtil } from '../tasks/tasks.util';

@Module({
  controllers: [UsersController],
  imports: [DbModule],
  providers: [TaskUtil],
})
export class UsersModule {}
