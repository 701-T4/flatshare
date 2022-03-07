import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './pages/routes/Router';
import { mainTheme } from './theme';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NextUIProvider theme={mainTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </NextUIProvider>
  );
};

export default App;
