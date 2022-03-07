import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DbModule],
})
export class UsersModule {}
