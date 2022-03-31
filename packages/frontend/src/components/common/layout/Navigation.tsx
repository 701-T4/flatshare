import React from 'react';
import AppLogo from '../util/AppLogo';
import UserDisplay from '../util/UserDisplay';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 shadow mb-8">
      <div className="flex justify-between items-center mx-10">
        <Button
          className="bg-transparent w-auto h-auto"
          onClick={() => navigate('/dashboard')}
        >
          <AppLogo />
        </Button>
        <UserDisplay />
      </div>
    </div>
  );
};

export default Navigation;
