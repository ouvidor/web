/**
 * Testes do componente Menu
 */
import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { StaticRouter } from 'react-router-dom';

import Menu from './index';
import GlobalStyle from '../../styles/global';
import { store } from '../../store';

storiesOf('MENU|Barra de menu', module)
  .add('como admin comum', () => (
    <Provider store={store}>
      <StaticRouter>
        <GlobalStyle />
        <Menu />
      </StaticRouter>
    </Provider>
  ))
  .add('como admin líder', () => (
    <Provider store={store}>
      <StaticRouter>
        <GlobalStyle />
        <Menu adminLeaderStatus />
      </StaticRouter>
    </Provider>
  ))
  .add('com botão ativo', () => (
    <Provider store={store}>
      <StaticRouter location="/map">
        <GlobalStyle />
        <Menu adminLeaderStatus />
      </StaticRouter>
    </Provider>
  ));
