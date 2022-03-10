import React, { useEffect } from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useSearchParams } from 'react-router-dom';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { authLoaded, setAuthLoaded, signedIn, setUser } = useAuth();
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('code') ?? '';

  const location = useLocation();
  // change to  api call
  const getUserHouseCode = () => {
    return { data: '123456' };
  };
  const { data: code } = getUserHouseCode();

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
    // Route to sign-in page with stored code
    localStorage.setItem('code', inviteCode);

    // To Do: Add to House
    // if (code === inviteCode) {
    //   return <UnauthenticatedRoutes alreadyInFlat={true} />;
    // }
    return <UnauthenticatedRoutes alreadyInFlat={false} />;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
