import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { APIController } from './api.controller';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [APIController],
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development.template'
          : '.env.production',
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
