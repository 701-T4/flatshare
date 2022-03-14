import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DbModule } from '../../db/db.module';
import { FirebaseAuthStrategy } from 'src/guards/firebase.auth';

@Module({
  controllers: [NoteController],
  imports: [DbModule],
  providers: [FirebaseAuthStrategy],
})
export class HouseModule {}
