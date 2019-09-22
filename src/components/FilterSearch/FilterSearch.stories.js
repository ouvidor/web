/**
 * Testes do componente FilterSearch
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterSearch from './index';
import GlobalStyle from '../../styles/global';

const tags = [
  { id: 1, label: 'Saúde', color: '#fff', background: '#d32727' },
  {
    id: 2,
    label: 'Saneamento',
    color: '#fff',
    background: '#277cd3',
  },
  {
    id: 3,
    label: 'Criminalidade',
    color: '#000',
    background: '#e56f2b',
  },
];

const suggestion = [
  { id: 1, label: 'Saúde' },
  { id: 2, label: 'Saneamento' },
  { id: 3, label: 'Criminalidade' },
];

storiesOf('SEARCH|SearchFilter', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <FilterSearch suggestionsState={suggestion} />
    </>
  ))
  .add('com texto', () => (
    <>
      <GlobalStyle />
      <FilterSearch
        textState="Testando componente"
        suggestionsState={suggestion}
      />
    </>
  ))
  .add('com tags definidas', () => (
    <>
      <GlobalStyle />
      <FilterSearch
        textState="Testando componente"
        tagsState={tags}
        suggestionsState={suggestion}
      />
    </>
  ))
  .add('carregando', () => (
    <>
      <GlobalStyle />
      <FilterSearch
        textState="Testando componente"
        tagsState={tags}
        loadingState
        suggestionsState={suggestion}
      />
    </>
  ));
