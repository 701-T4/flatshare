import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [UsersController],
  imports: [DbModule],
})
export class UsersModule {}
