import { ApiProperty } from '@nestjs/swagger';
import { BillUser } from './create-bill.dto';

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

  @ApiProperty({ type: [BillUser] })
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
