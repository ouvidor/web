/**
 * Testes do componente ManifestationCard
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ManifestationCard from './index';

import { Manifestation } from '../../util/Examples';

storiesOf('MANIFESTATION|Card', module)
  .add('default', () => <ManifestationCard />)
  .add('com tags', () => <ManifestationCard manifestation={Manifestation} />);
