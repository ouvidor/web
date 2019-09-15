/**
 * Testes do componente ManifestationCard
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ManifestationCard from './index';
import GlobalStyle from '../../styles/global';

const manifestation = {
  title: 'Denuncia',
  tags: [{ id: 1, name: 'Saúde', color: '#fff', background: '#d32727' }],
  upvotes: 12,
};

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
      <ManifestationCard manifestation={manifestation} />
    </>
  ));
