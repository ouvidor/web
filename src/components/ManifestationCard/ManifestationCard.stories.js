/**
 * Testes do componente ManifestationCard
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ManifestationCard from './index';
import GlobalStyle from '../../styles/global';

storiesOf('MANIFESTATION|Card', module).add('default', () => (
  <>
    <GlobalStyle />
    <ManifestationCard />
  </>
));
