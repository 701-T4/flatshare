import React, { useState } from 'react';
import Page from '../../components/common/layout/Page';
import { useHouse } from '../../hooks/useHouse';
import NoteCardController from '../../components/notes/note/noteCardController';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { Button } from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/outline';
import NewNoteModal from '../../components/notes/note/newNoteModal';

interface NotesProps {}

const NotesPage: React.FC<NotesProps> = () => {
  const { name } = useHouse();

  const [createNoteVisible, setCreateNoteVisible] = useState(false);
  const createNoteHandler = () => setCreateNoteVisible(true);

  return (
    <Page backpath="/dashboard">
      <div className="flex items-center justify-between pb-1">
        <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500 ">
          <div className="text-lg font-medium">
            <span className="mr-2 font-semibold text-teal-500">{name}</span>
            Notes Board
          </div>
        </UnderlinedText>
        <Button
          auto
          size="sm"
          onClick={createNoteHandler}
          icon={<PlusIcon className="w-6 h-6" />}
        ></Button>
      </div>
      <NewNoteModal
        createNoteVisible={createNoteVisible}
        setCreateNoteVisible={setCreateNoteVisible}
      />
      <NoteCardController />
    </Page>
  );
};

export default NotesPage;
