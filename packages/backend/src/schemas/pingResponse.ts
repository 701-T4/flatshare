import { ApiProperty } from '@nestjs/swagger';
import { DecodedIdToken } from 'firebase-admin/auth';

export default class PingResponse {
  @ApiProperty()
  time: Date;

  @ApiProperty()
  env: string;

  @ApiProperty()
  user: DecodedIdToken;
}
