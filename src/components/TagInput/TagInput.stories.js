/**
 * Testes do componente TagInput
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TagInput from './index';
import { tags, suggestions } from '../../util/Examples';

function setTags(newTags) {
  console.log(newTags);
}

storiesOf('TAGS|Input', module).add('default', () => (
  <TagInput suggestionsState={suggestions} tags={tags} setTags={setTags} />
));
