import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import AppLogo from '../util/AppLogo';
import UserDisplay from '../util/UserDisplay';
import BackButton from '../util/BackButton';

interface NavigationProps {
  backpath?: string;
}

const Navigation: React.FC<NavigationProps> = ({ backpath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="p-4 mb-8 shadow bg-slate-50">
      <div className="flex items-center justify-between mx-10">
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
