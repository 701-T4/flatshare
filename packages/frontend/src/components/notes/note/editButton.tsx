import React, { useState } from 'react';
import { DocumentAddIcon, PlusIcon } from '@heroicons/react/outline';
import { Avatar } from '@nextui-org/react';
import EditNoteModal from './editNoteModal';

interface EditButtonProps {}

const EditButton: React.FC<EditButtonProps> = () => {
  const [createNoteVisible, setCreateNoteVisible] = useState(false);
  const createNoteHandler = () => setCreateNoteVisible(true);

  return (
    <div>
      <Avatar
        squared
        icon={<DocumentAddIcon className="w-full" />}
        css={{ p: 10 }}
        as="button"
        pointer
        onClick={createNoteHandler}
      />
      <EditNoteModal
        createNoteVisible={createNoteVisible}
        setCreateNoteVisible={setCreateNoteVisible}
      />
    </div>
  );
};

export default EditButton;
