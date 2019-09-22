/**
 * Testes do componente CardList
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import CardList from './index';
import GlobalStyle from '../../styles/global';

storiesOf('SEARCH|CardList', module)
  .addParameters({})
  .add('default', () => (
    <>
      <GlobalStyle />
      <CardList />
    </>
  ));
