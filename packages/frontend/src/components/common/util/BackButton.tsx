import React from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/outline';

interface BackButtonProps {
  backpath?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ backpath }) => {
  const navigate = useNavigate();

  return (
    <div>
      {backpath && (
        <Button
          onClick={() => navigate(backpath)}
          className="flex items-center justify-center py-3 -ml-4 -mr-6 transition-all sm:mr-2 h-fit sm:-ml-11 hover:bg-gray-700 hover:bg-opacity-5"
          auto
          light
          icon={<ChevronLeftIcon className="w-9" />}
        />
      )}
    </div>
  );
};

export default BackButton;
