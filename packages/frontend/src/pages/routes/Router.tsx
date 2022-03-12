import React, { useEffect } from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { authLoaded, setAuthLoaded, setUser, signedIn } = useAuth();

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoaded(true);
    });
    return () => {
      clearListener();
    };
  }, [setAuthLoaded, setUser]);

  console.log({ authLoaded, signedIn });

  if (!authLoaded) {
    return null;
  }

  if (!signedIn) {
    return <UnauthenticatedRoutes />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
