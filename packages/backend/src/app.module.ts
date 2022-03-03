import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiV1Module } from './v1/api.module';

@Module({
  imports: [
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
