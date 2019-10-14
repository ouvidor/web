/**
 * Testes do componente Menu
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { StaticRouter } from 'react-router-dom';

import Menu from './index';

storiesOf('MENU|Barra de menu', module)
  .add('como admin comum', () => (
    <StaticRouter>
      <Menu />
    </StaticRouter>
  ))
  .add('como admin líder', () => (
    <StaticRouter>
      <Menu adminLeaderStatus />
    </StaticRouter>
  ))
  .add('com botão ativo', () => (
    <StaticRouter location="/map">
      <Menu adminLeaderStatus />
    </StaticRouter>
  ));
