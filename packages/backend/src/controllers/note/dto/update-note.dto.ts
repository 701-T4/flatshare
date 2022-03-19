import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { NoteContents, NoteModel } from '../../../db/note/note.schema';

export class UpdateNoteDto extends PartialType(NoteModel) {
  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly value?: string;

  @IsEnum(NoteContents)
  @ApiProperty({
    enum: NoteContents,
  })
  readonly type?: NoteContents;
}
