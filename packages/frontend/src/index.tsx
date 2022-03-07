import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NextUIProvider } from '@nextui-org/react';
import { mainTheme } from './theme';

import './services/firebase';
import './styles/index.css';

ReactDOM.render(
  <NextUIProvider theme={mainTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>,
  document.getElementById('root'),
);
