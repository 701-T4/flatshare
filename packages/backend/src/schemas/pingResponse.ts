import { ApiProperty } from '@nestjs/swagger';

export default class PingResponse {
  @ApiProperty()
  time: Date;
}
