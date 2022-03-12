import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import UserDropdown from './UserDropdown';

interface UserDisplayProps {}

const UserDisplay: React.FC<UserDisplayProps> = () => {
  return <UserDropdown />;
};

export default UserDisplay;
