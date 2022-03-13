import { ApiProperty } from '@nestjs/swagger';
import { NoteContents } from 'src/db/note/note.schema';

export default class NoteResponseDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  value: string;
  @ApiProperty({ required: false })
  type: NoteContents;
  @ApiProperty({ required: false })
  owner: string;
  @ApiProperty({ required: false })
  house: string;
}
