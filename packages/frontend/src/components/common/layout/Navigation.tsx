import React from 'react';
import AppLogo from '../util/AppLogo';
import UserDisplay from '../util/UserDisplay';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 mb-8 shadow bg-slate-50">
      <div className="flex items-center justify-between mx-10">
        <Button
          className="w-auto h-auto bg-transparent"
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
