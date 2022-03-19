import TrashIcon from '@heroicons/react/solid/TrashIcon';
import { Button } from '@nextui-org/react';
import React from 'react';

interface DeleteButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ enabled, onClick }) => {
  return (
    <>
      {enabled ? (
        <Button color="error" onClick={onClick} className="w-1/3 self-center">
          <TrashIcon className="h-5 w-5" />
          Delete
        </Button>
      ) : null}
    </>
  );
};

export default DeleteButton;
