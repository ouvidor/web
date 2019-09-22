/**
 * Testes do componente ManifestationCard
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ManifestationCard from './index';
import GlobalStyle from '../../styles/global';

import { Manifestation } from '../../util/Examples';

storiesOf('MANIFESTATION|Card', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <ManifestationCard />
    </>
  ))
  .add('com tags', () => (
    <>
      <GlobalStyle />
      <ManifestationCard manifestation={Manifestation} />
    </>
  ));
