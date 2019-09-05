/**
 * Testes do componente Menu
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { StaticRouter } from 'react-router-dom';

import Menu from './index';
import GlobalStyle from '../../styles/global';

storiesOf('MENU|Barra de menu', module)
  .add('como admin comum', () => (
    <StaticRouter>
      <GlobalStyle />
      <Menu />
    </StaticRouter>
  ))
  .add('como adminMaster', () => (
    <StaticRouter>
      <GlobalStyle />
      <Menu adminMasterStatus />
    </StaticRouter>
  ))
  .add('com botão ativo', () => (
    <StaticRouter location="/map">
      <GlobalStyle />
      <Menu adminMasterStatus />
    </StaticRouter>
  ));
