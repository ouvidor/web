/**
 * Base da aplicação
 * Composta de rotas e estilização global.
 */

import React from 'react';
import { Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes />
    </Router>
  );
}

export default App;
