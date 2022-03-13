import { ApiProperty } from '@nestjs/swagger';
import { NoteContents } from 'src/db/note/note.schema';
import { Types } from 'mongoose';
// import { IsEnum } from 'class-validator';

export default class NoteResponseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
  // @IsEnum(NoteContents)
  @ApiProperty({
    enum: NoteContents,
  })
  type: NoteContents;
  @ApiProperty()
  owner: Types.ObjectId;
  @ApiProperty()
  house: Types.ObjectId;
}
