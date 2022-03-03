import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse } from '@nestjs/swagger';
import PingResponse from '../schemas/pingResponse';

@Controller()
export class APIController {
  constructor(private configService: ConfigService) {}

  @Get('ping')
  @ApiOkResponse({ description: 'ping successful', type: PingResponse })
  getPing(): PingResponse {
    return { time: new Date(), env: this.configService.get<string>('PING_TEXT') };
  }
}
