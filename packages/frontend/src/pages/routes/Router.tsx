import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return <UnauthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
