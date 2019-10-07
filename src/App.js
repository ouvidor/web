/**
 * Base da aplicação
 * Composta de rotas, estilização global,
 * notificação global atráves do `react-toastify` e
 * estado global com o `react-redux`.
 */

import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './styles/global';
import Routes from './routes';

// react-router-dom ouvirá por mudanças que acontecerem no history
import history from './services/history';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <Routes />
          <ToastContainer autoClose={3000} hideProgressBar={false} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
