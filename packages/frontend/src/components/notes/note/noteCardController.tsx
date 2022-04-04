import React from 'react';
import NotesModal from './NotesGrid';
import { useApi } from '../../../hooks/useApi';

interface NoteCardControllerProps {}

export enum NoteTypes {
  PLAIN = 'PLAIN',
  SECRET = 'SECRET',
  WIFI = 'WIFI',
}

const NoteCardController: React.FC<NoteCardControllerProps> = () => {
  const { data } = useApi('/api/v1/house/note', { method: 'get' });

  return (
    <div>
      <NotesModal notes={data?.notes} />
    </div>
  );
};

export default NoteCardController;
