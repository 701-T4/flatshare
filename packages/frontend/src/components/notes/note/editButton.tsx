import React from 'react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Avatar } from '@nextui-org/react';

interface EditButtonProps {}

const EditButton: React.FC<EditButtonProps> = () => {
  return (
    <Avatar
      squared
      icon={<DocumentAddIcon className="w-full" />}
      css={{ p: 10 }}
      as="button"
      pointer
    />
  );
};

export default EditButton;
