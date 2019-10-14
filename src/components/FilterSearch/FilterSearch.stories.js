/**
 * Testes do componente FilterSearch
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import FilterSearch from './index';
import { tags, suggestions } from '../../util/Examples';

storiesOf('SEARCH|SearchFilter', module)
  .add('default', () => <FilterSearch suggestionsState={suggestions} />)
  .add('com texto', () => (
    <FilterSearch
      textState="Testando componente"
      suggestionsState={suggestions}
    />
  ))
  .add('com tags definidas', () => (
    <FilterSearch
      textState="Testando componente"
      tagsState={tags}
      suggestionsState={suggestions}
    />
  ))
  .add('carregando', () => (
    <FilterSearch
      textState="Testando componente"
      tagsState={tags}
      loadingState
      suggestionsState={suggestions}
    />
  ));
