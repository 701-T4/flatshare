import React, { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Router from './pages/routes/Router';
import QueryParamHandler from './pages/routes/QueryParamHandler';
import { mainTheme } from './theme';
import { CornerAlertManager } from './components/common/util/CornerAlert';
import { getAuth } from 'firebase/auth';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NextUIProvider theme={mainTheme}>
      <AuthProvider>
        <CornerAlertManager>
          <AuthAwareApp />
        </CornerAlertManager>
      </AuthProvider>
    </NextUIProvider>
  );
};

const AuthAwareApp: React.FC = () => {
  const { authLoaded, setUser, setAuthLoaded } = useAuth();

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoaded(true);
    });
    return () => {
      clearListener();
    };
  }, [setUser, setAuthLoaded]);

  if (!authLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <QueryParamHandler>
        <Router />
      </QueryParamHandler>
    </BrowserRouter>
  );
};

export default App;
