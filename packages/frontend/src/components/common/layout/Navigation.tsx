import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import AppLogo from '../util/AppLogo';
import UserDisplay from '../util/UserDisplay';
import BackButton from '../util/BackButton';

interface NavigationProps {
  backpath?: string;
}

const Navigation: React.FC<NavigationProps> = ({ backpath }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 mb-8 shadow bg-slate-50">
      <div className="flex items-center justify-between mx-10">
        <BackButton backpath={backpath} />
        <Button
          className="w-auto h-auto bg-transparent"
          onClick={() => navigate('/dashboard')}
        >
          <AppLogo />
        </Button>
        <div className="ml-auto">
          <UserDisplay />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
