/**
 * Testes do componente Pagination
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { StaticRouter } from 'react-router-dom';

import Pagination from './index';
import GlobalStyle from '../../styles/global';

storiesOf('SEARCH|Paginação', module)
  .add('apenas uma página', () => (
    <StaticRouter>
      <GlobalStyle />
      <Pagination />
    </StaticRouter>
  ))
  .add('no meio das páginas', () => (
    <StaticRouter>
      <GlobalStyle />
      <Pagination page={2} maxPage={3} />
    </StaticRouter>
  ))
  .add('na primeira página', () => (
    <StaticRouter>
      <GlobalStyle />
      <Pagination page={1} maxPage={2} />
    </StaticRouter>
  ))
  .add('na ultima página', () => (
    <StaticRouter>
      <GlobalStyle />
      <Pagination page={2} maxPage={2} />
    </StaticRouter>
  ))
  .add('carregando', () => (
    <StaticRouter>
      <GlobalStyle />
      <Pagination loadingState />
    </StaticRouter>
  ));
