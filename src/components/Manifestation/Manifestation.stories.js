/**
 * Testes do componente Manifestation
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Manifestation from './index';
import GlobalStyle from '../../styles/global';

const manifestation = {
  title: 'Denuncia',
  tags: [
    { id: 1, name: 'Saúde', color: '#fff', background: '#d32727' },
    { id: 1, name: 'Lixo', color: '#fff', background: '#1a1' },
  ],
  upvotes: 12,
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
  date: '15/09/2020',
  location: 'bairro Algodao, rua naoseiqual',
};

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
      <Manifestation manifestation={manifestation} />
    </>
  ));
