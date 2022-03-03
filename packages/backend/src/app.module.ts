import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { APIController } from './api.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
})
export class AppModule {}
