/**
 * Testes do componente Manifestation
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Manifestation from './index';

import { Manifestation as ManifestationExample } from '../../util/Examples';

storiesOf('MANIFESTATION|Principal', module)
  .add('default', () => <Manifestation />)
  .add('com manifesto', () => (
    <Manifestation manifestation={ManifestationExample} />
  ));
