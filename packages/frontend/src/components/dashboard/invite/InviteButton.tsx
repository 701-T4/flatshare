import { ShareIcon } from '@heroicons/react/outline';
import React from 'react';

interface InviteButtonProps {
  onClick: () => void;
}

const InviteButton: React.FC<InviteButtonProps> = ({ onClick }) => {
  return (
    <div
      className="items-center gap-x-1 flex -m-1 px-2 py-1 rounded-lg bg-opacity-0 hover:bg-opacity-5 bg-gray-700 cursor-pointer transition-all"
      onClick={onClick}
    >
      <span className="text-md font-semibold">Invite</span>
      <ShareIcon className="w-6" />
    </div>
  );
};

export default InviteButton;
