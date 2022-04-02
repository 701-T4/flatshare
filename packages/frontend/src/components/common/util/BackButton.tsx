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
          className="flex justify-center items-center py-3 h-fit -ml-11 mr-2 hover:bg-gray-700 hover:bg-opacity-5 transition-all"
          auto
          light
          icon={<ChevronLeftIcon className="w-10" />}
        />
      )}
    </div>
  );
};

export default BackButton;
