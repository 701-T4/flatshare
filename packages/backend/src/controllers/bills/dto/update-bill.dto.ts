import { ApiProperty } from '@nestjs/swagger';

export class UpdateBillDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
