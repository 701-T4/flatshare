import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { NoteContents, NoteModel } from '../../../db/note/note.schema';

export class CreateNoteDto extends NoteModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly value: string;

  @IsEnum(NoteContents)
  @ApiProperty({
    enum: NoteContents,
  })
  readonly type: NoteContents;
}
