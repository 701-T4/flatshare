import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/outline';
import { Button } from '@nextui-org/react';
import EditNoteModal from './editNoteModal';

interface EditButtonProps {
  activeTitle: string;
  setTitle: (value: string) => void;
  activeValue: string;
  setValue: (value: string) => void;
  activeType: string;
  activeId: string;
  setVisibleModal: (value: boolean) => void;
}

const EditButton: React.FC<EditButtonProps> = ({
  activeTitle,
  setTitle,
  activeValue,
  setValue,
  activeType,
  activeId,
  setVisibleModal,
}) => {
  const [editNoteVisible, setEditNoteVisible] = useState(false);
  const editNoteHandler = () => setEditNoteVisible(true);

  return (
    <div>
      <Button
        auto
        icon={<PencilIcon className="w-5 h-5 text-teal-50" />}
        css={{ p: 10 }}
        as="button"
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
        setVisibleModal={setVisibleModal}
      />
    </div>
  );
};

export default EditButton;
