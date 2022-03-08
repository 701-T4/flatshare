import React, { createContext, useState } from 'react';
import { UserType } from '../types/user-type';

interface authContext {
  authLoaded: boolean;
  setAuthLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const AuthContext = createContext<authContext>({
  authLoaded: true,
  setAuthLoaded: () => false,
  signedIn: false,
  setSignedIn: () => null,
  user: { displayName: '1', email: '' },
  setUser: () => null,
});

// This context provider is wrapped around the whole project
// so when the authentication status changes the project re-renders
export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [authLoaded, setAuthLoaded] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({ displayName: '', email: '' });

  return (
    <AuthContext.Provider
      value={{
        authLoaded,
        setAuthLoaded,
        signedIn,
        setSignedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object
export const useAuth = () => React.useContext(AuthContext);
