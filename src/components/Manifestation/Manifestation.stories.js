/**
 * Testes do componente Manifestation
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Manifestation from './index';
import GlobalStyle from '../../styles/global';

import { Manifestation as ManifestationExample } from '../../util/Examples';

storiesOf('MANIFESTATION|Principal', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <Manifestation />
    </>
  ))
  .add('com manifesto', () => (
    <>
      <GlobalStyle />
      <Manifestation manifestation={ManifestationExample} />
    </>
  ));
