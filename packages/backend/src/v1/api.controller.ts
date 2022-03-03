import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import PingResponse from '../schemas/pingResponse';

@Controller()
export class APIController {
  constructor() {}

  @Get('ping')
  @ApiOkResponse({ description: 'ping successful', type: PingResponse })
  getPing(): { time: Date } {
    return { time: new Date() };
  }
}
