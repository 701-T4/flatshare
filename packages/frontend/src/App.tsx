import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Router from './pages/routes/Router';
import QueryParamHandler from './pages/routes/QueryParamHandler';
import { mainTheme } from './theme';
import { CornerAlertManager } from './components/common/util/CornerAlert';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NextUIProvider theme={mainTheme}>
      <AuthProvider>
        <CornerAlertManager>
          <BrowserRouter>
            <QueryParamHandler>
              <Router />
            </QueryParamHandler>
          </BrowserRouter>
        </CornerAlertManager>
      </AuthProvider>
    </NextUIProvider>
  );
};

export default App;
