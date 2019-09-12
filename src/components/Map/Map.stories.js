/**
 * Testes do componente Map
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from './index';
import GlobalStyle from '../../styles/global';

const view = {
  width: 600,
  height: 500,
  latitude: 12.7577,
  longitude: -122.4376,
  zoom: 8,
};

storiesOf('MAP|Mapa', module).add('default', () => (
  <>
    <GlobalStyle />

    <Map viewState={view} />
  </>
));
