/**
 * Testes do componente FilterSearch
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterSearch from './index';
import GlobalStyle from '../../styles/global';

storiesOf('SEARCH|SearchFilter', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <FilterSearch />
    </>
  ))
  .add('com texto', () => (
    <>
      <GlobalStyle />
      <FilterSearch textState="Testando componente" />
    </>
  ))
  .add('carregando', () => (
    <>
      <GlobalStyle />
      <FilterSearch textState="Testando componente" loadingState />
    </>
  ));
