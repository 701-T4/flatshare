import { Module } from '@nestjs/common';
import { APIController } from './api.controller';

@Module({
  controllers: [APIController],
})
export class ApiV1Module {}
