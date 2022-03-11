import { ApiProperty } from '@nestjs/swagger';

export class JoinHouseDto {
  @ApiProperty()
  readonly houseCode: string;
}
