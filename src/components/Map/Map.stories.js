/**
 * Testes do componente Map
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from './index';
import GlobalStyle from '../../styles/global';

import { Manifestation } from '../../util/Examples';

const view = {
  width: 600,
  height: 500,
  latitude: -22.8869,
  longitude: -42.0266,
  zoom: 13,
};

const manifestations = [
  Manifestation,
  {
    ...Manifestation,
    id: 2,
    latitude: -22.8869,
    longitude: -42.0266,
  },
];

storiesOf('MAP|Mapa', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <Map token={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} viewState={view} />
    </>
  ))
  .add('com manifestações', () => (
    <>
      <GlobalStyle />
      <Map
        token={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        viewState={view}
        manifestationsState={manifestations}
      />
    </>
  ));
