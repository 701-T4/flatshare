import { ApiProperty } from '@nestjs/swagger';

export class BillResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;

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
