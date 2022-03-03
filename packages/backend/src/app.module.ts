import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ApiV1Module } from './v1/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development.template' : '.env.production',
      isGlobal: true,
    }),
    ApiV1Module,
    RouterModule.register([
      {
        path: 'api/v1',
        module: ApiV1Module,
      },
    ]),
  ],
})
export class AppModule {}
