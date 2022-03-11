import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';

class PingResponse {
  @ApiProperty()
  time: Date;

  @ApiProperty()
  env: string;
}

@Controller('/api/v1')
export class APIController {
  constructor(private configService: ConfigService) {}

  @Get('ping')
  @ApiOperation({ summary: 'simple endpoint to test api health' })
  @ApiOkResponse({ description: 'ping successful', type: PingResponse })
  getPing(): PingResponse {
    return {
      time: new Date(),
      env: this.configService.get<string>('PING_TEXT'),
    };
  }
}
