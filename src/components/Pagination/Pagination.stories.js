/**
 * Testes do componente Pagination
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { StaticRouter } from 'react-router-dom';

import Pagination from './index';

storiesOf('SEARCH|Paginação', module)
  .add('apenas uma página', () => (
    <StaticRouter>
      <Pagination />
    </StaticRouter>
  ))
  .add('no meio das páginas', () => (
    <StaticRouter>
      <Pagination page={2} maxPage={3} />
    </StaticRouter>
  ))
  .add('na primeira página', () => (
    <StaticRouter>
      <Pagination page={1} maxPage={2} />
    </StaticRouter>
  ))
  .add('na ultima página', () => (
    <StaticRouter>
      <Pagination page={2} maxPage={2} />
    </StaticRouter>
  ))
  .add('carregando', () => (
    <StaticRouter>
      <Pagination loadingState />
    </StaticRouter>
  ));
