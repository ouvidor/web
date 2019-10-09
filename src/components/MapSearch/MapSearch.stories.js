/**
 * Testes do componente MapSearch
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import MapSearch from './index';
import GlobalStyle from '../../styles/global';

storiesOf('SEARCH|MapSearch', module)
  .addParameters({})
  .add('default', () => (
    <>
      <GlobalStyle />
      <MapSearch />
    </>
  ));
