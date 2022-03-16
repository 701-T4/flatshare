import { ApiProperty } from '@nestjs/swagger';

export class CreateBillDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  due: number;

  @ApiProperty()
  users: {
    id: string;
    amount: number;
    paid: boolean;
    proof: string;
  }[];
}
