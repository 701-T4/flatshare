import { ApiProperty } from '@nestjs/swagger';
import { NoteContents, NoteModel } from '../../../db/note/note.schema';

export class CreateNoteDto extends NoteModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly value: string;

  @ApiProperty()
  readonly type: NoteContents;
}
