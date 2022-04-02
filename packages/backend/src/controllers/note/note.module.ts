import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DbModule } from '../../db/db.module';
import { NoteUtil } from './note.utils';

@Module({
  controllers: [NoteController],
  imports: [DbModule],
  providers: [NoteUtil],
})
export class NoteModule {}
