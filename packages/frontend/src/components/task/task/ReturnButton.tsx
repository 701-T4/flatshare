import ArrowNarrowLeftIcon from '@heroicons/react/solid/ArrowNarrowLeftIcon';
import React from 'react';

interface ReturnButtonProps {
  onClick: () => void;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="hover:text-teal-500">
      <ArrowNarrowLeftIcon className="h-5 inline " />
      <p className="inline align-middle">Tasks</p>
    </button>
  );
};

export default ReturnButton;
