/**
 * Testes do componente Tag
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Tag from './index';
import GlobalStyle from '../../styles/global';

const tagSaude = { id: 1, name: 'Saúde' };
const tagSaneamento = { id: 2, name: 'Saneamento' };
const tagCriminalidade = { id: 3, name: 'Criminalidade' };

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
