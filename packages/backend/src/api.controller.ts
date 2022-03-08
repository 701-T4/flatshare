import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse } from '@nestjs/swagger';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseGuard } from './guards/firebase.guard';
import PingResponse from './schemas/pingResponse';
import { User } from './util/user.decorator';

@Controller('/api/v1')
@UseGuards(FirebaseGuard)
export class APIController {
  constructor(private configService: ConfigService) {}

  @Get('ping')
  @ApiOkResponse({ description: 'ping successful', type: PingResponse })
  getPing(@User() user: DecodedIdToken): PingResponse {
    console.log(user);
    return {
      time: new Date(),
      env: this.configService.get<string>('PING_TEXT'),
    };
  }
}
