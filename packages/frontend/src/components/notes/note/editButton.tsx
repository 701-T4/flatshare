import React, { useState } from 'react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Avatar } from '@nextui-org/react';
import EditNoteModal from './editNoteModal';

interface EditButtonProps {
  activeTitle: string;
  setTitle: (value: string) => void;
  activeValue: string;
  setValue: (value: string) => void;
  activeType: string;
  activeId: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  activeTitle,
  setTitle,
  activeValue,
  setValue,
  activeType,
  activeId,
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
        setTitle={setTitle}
        activeValue={activeValue}
        setValue={setValue}
        activeType={activeType}
        activeId={activeId}
        editNoteVisible={editNoteVisible}
        setEditNoteVisible={setEditNoteVisible}
      />
    </div>
  );
};

export default EditButton;
