import React, { useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Router from './pages/routes/Router';
import QueryParamHandler from './pages/routes/QueryParamHandler';
import { mainTheme } from './theme';
import { CornerAlertManager } from './components/common/util/CornerAlert';
import { getAuth } from 'firebase/auth';
import useFullLoader, {
  LoadingCountContextProvider,
  useIsLoading,
} from './hooks/useFullLoader';
import LoaderPage from './pages/public/LoaderPage';

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
