import React from 'react';
import AppLogo from '../util/AppLogo';
import UserDisplay from '../util/UserDisplay';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="p-4 shadow mb-8">
      <div className="flex justify-between items-center mx-10">
        <AppLogo />
        <UserDisplay />
      </div>
    </div>
  );
};

export default Navigation;
