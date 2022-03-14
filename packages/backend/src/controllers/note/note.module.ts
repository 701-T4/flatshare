import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DbModule } from '../../db/db.module';

@Module({
  controllers: [NoteController],
  imports: [DbModule],
})
export class NoteModule {}
