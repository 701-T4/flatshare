import React from 'react';
import { Button } from '@nextui-org/react';
import NotesModal from './NotesGrid';
import { useApi, useApiMutation } from '../../../hooks/useApi';

interface NoteCardControllerProps {}

export enum NoteTypes {
  PLAIN = 'PLAIN',
  SECRET = 'SECRET',
  WIFI = 'WIFI',
}

const NoteCardController: React.FC<NoteCardControllerProps> = () => {
  const { data, mutate } = useApi('/api/v1/house/note', { method: 'get' });

  const createNote = useApiMutation('/api/v1/house/note', { method: 'post' });

  // temp data to test api fetch works
  const newNoteTestDetails = {
    name: 'note2',
    value: 'this is the value',
    type: NoteTypes.PLAIN,
  };

  // temp to be linked to actual create note button
  async function onClickTest() {
    try {
      const { name, value, type } = newNoteTestDetails;
      await createNote({ body: { name, value, type } });
      mutate();
    } catch (e) {}
  }

  return (
    <div>
      <NotesModal notes={data?.notes} />
      <Button onClick={onClickTest}>Test</Button>
    </div>
  );
};

export default NoteCardController;
