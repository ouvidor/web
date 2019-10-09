/**
 * Testes do componente TagInput
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TagInput from './index';
import GlobalStyle from '../../styles/global';

const tags = [
  { id: 1, name: 'Saúde' },
  { id: 2, name: 'Saneamento' },
  { id: 3, name: 'Criminalidade' },
];
const suggestion = [
  { id: 1, name: 'Saúde' },
  { id: 2, name: 'Saneamento' },
  { id: 3, name: 'Criminalidade' },
];

function setTags(newTags) {
  console.log(newTags);
}

storiesOf('TAGS|Input', module).add('default', () => (
  <>
    <GlobalStyle />
    <TagInput suggestionsState={suggestion} tags={tags} setTags={setTags} />
  </>
));
