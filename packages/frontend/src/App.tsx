import { NextUIProvider } from '@nextui-org/react';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CornerAlertManager } from './components/common/util/CornerAlert';
import { AuthProvider, useAuth } from './hooks/useAuth';
import useFullLoader, {
  LoadingCountContextProvider,
} from './hooks/useFullLoader';
import QueryParamHandler from './pages/routes/QueryParamHandler';
import Router from './pages/routes/Router';
import { mainTheme } from './theme';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NextUIProvider theme={mainTheme}>
      <AuthProvider>
        <CornerAlertManager>
          <LoadingCountContextProvider>
            <AuthAwareApp />
          </LoadingCountContextProvider>
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

  useFullLoader(() => !authLoaded);

  return (
    <BrowserRouter>
      <QueryParamHandler>
        <Router />
      </QueryParamHandler>
    </BrowserRouter>
  );
};

export default App;
