/**
 * Testes do componente MapSearch
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import MapSearch from './index';

storiesOf('SEARCH|MapSearch', module)
  .addParameters({})
  .add('default', () => <MapSearch />);
