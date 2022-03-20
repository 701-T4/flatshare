import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BillUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  paid: boolean;

  @ApiPropertyOptional()
  proof: string;
}

export class CreateBillDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  due: number;

  @ApiProperty({ type: [BillUser] })
  users: BillUser[];
}
