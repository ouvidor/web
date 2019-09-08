/**
 * Testes do componente Tag
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Tag from './index';
import GlobalStyle from '../../styles/global';

const tagSaude = { id: 1, name: 'Saúde', color: '#fff', background: '#d32727' };
const tagSaneamento = {
  id: 2,
  name: 'Saneamento',
  color: '#fff',
  background: '#277cd3',
};
const tagCriminalidade = {
  id: 3,
  name: 'Criminalidade',
  color: '#000',
  background: '#e56f2b',
};

function onDelete() {
  console.log('onDelete');
}

storiesOf('TAGS|Tag', module).add('todas as tags', () => (
  <>
    <GlobalStyle />
    <Tag tag={tagSaude} onDelete={onDelete} />
    <Tag tag={tagSaneamento} onDelete={onDelete} />
    <Tag tag={tagCriminalidade} onDelete={onDelete} />
  </>
));
