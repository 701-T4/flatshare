import { ApiProperty } from '@nestjs/swagger';
import { NoteContents } from '../../../db/note/note.schema';
import { Types } from 'mongoose';

export class NoteResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  type: NoteContents;
  @ApiProperty()
  house: Types.ObjectId;
}

export class NotesResponseDto {
  @ApiProperty({
    type: [NoteResponseDto],
  })
  notes: NoteResponseDto[];
}
