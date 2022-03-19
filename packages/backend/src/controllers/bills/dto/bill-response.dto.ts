import { ApiProperty } from '@nestjs/swagger';

export class BillResponseDto {
  @ApiProperty()
  id: string;

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

export class BillsResponseDto {
  @ApiProperty({
    type: [BillResponseDto],
  })
  bills: BillResponseDto[];
}
