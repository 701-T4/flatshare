import { ApiProperty } from '@nestjs/swagger';
import { NoteContents } from '../../../db/note/note.schema';
import { Types } from 'mongoose';

export default class NoteResponseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  type: NoteContents;
  @ApiProperty()
  house: Types.ObjectId;
}
