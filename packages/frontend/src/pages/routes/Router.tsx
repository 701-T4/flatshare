import React, { useEffect } from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { authLoaded, setAuthLoaded, signedIn, setUser } = useAuth();

  const location = useLocation()
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
    let path = location.pathname
    // To Do: Add to House
    // To-do: Check if user house object is empty
    if (code === path.slice(path.indexOf("=") + 1)){
      return <UnauthenticatedRoutes alreadyInFlat={true}/>;
    }
    return <UnauthenticatedRoutes alreadyInFlat={false}/>;
  }

  return <AuthenticatedRoutes />;
};

export default Router;
