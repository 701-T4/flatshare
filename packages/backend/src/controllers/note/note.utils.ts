import { Injectable } from '@nestjs/common';
import { NoteDocument } from 'src/db/note/note.schema';
import { NoteResponseDto } from './dto/note-response.dto';

@Injectable()
export class NoteUtil {
  async covertNoteDocumentToResponseDTO(
    noteDocumet: NoteDocument,
  ): Promise<NoteResponseDto> {
    return {
      id: noteDocumet._id,
      name: noteDocumet.name,
      value: noteDocumet.value,
      type: noteDocumet.type,
      house: noteDocumet.house,
    };
  }
}
