import TrashIcon from '@heroicons/react/solid/TrashIcon';
import { Button } from '@nextui-org/react';
import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button color="error" onClick={onClick} className="w-1/3 self-center">
      <TrashIcon className="h-5 w-5" />
      Delete
    </Button>
  );
};

export default DeleteButton;
