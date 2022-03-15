import React from 'react';
import Page from '../../components/common/layout/Page';
import { useHouse } from '../../hooks/useHouse';
import NoteCardController from '../../components/notes/note/noteCardController';

interface NotesProps {}

const NotesPage: React.FC<NotesProps> = () => {
  
  const { name } = useHouse();

  return (
    <Page>
      <NoteCardController />
    </Page>
  );
};

export default NotesPage;
