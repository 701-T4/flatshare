import React, { useState } from 'react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Avatar } from '@nextui-org/react';
import EditNoteModal from './editNoteModal';

interface EditButtonProps {
  activeTitle: string;
  activeValue: string;
  activeType: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  activeTitle,
  activeValue,
  activeType,
}) => {
  const [editNoteVisible, setEditNoteVisible] = useState(false);
  const editNoteHandler = () => setEditNoteVisible(true);

  return (
    <div>
      <Avatar
        squared
        icon={<DocumentAddIcon className="w-full" />}
        css={{ p: 10 }}
        as="button"
        pointer
        onClick={editNoteHandler}
      />
      <EditNoteModal
        activeTitle={activeTitle}
        activeValue={activeValue}
        activeType={activeType}
        editNoteVisible={editNoteVisible}
        setEditNoteVisible={setEditNoteVisible}
      />
    </div>
  );
};

export default EditButton;
