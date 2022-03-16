import { ApiProperty } from '@nestjs/swagger';

export class PayBillDto {
  @ApiProperty()
  paid: boolean;
}
