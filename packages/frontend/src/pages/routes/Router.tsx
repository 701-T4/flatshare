import React, { useEffect } from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { authLoaded, setAuthLoaded, signedIn, setUser } = useAuth();

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      setAuthLoaded(true);
      setUser(user);
    });
    return () => {
      clearListener();
    };
  }, [setAuthLoaded, setUser]);

  if (!authLoaded) {
    return null;
  }

  if (!signedIn) {
    return <UnauthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
