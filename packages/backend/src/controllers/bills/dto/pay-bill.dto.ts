import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PayBillDto {
  @ApiProperty()
  paid: boolean;

  @ApiPropertyOptional()
  proof: string;
}
