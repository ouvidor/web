/**
 * Testes do componente Tag
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Tag from './index';
import { tags } from '../../util/Examples';

function onDelete() {
  console.log('onDelete');
}

storiesOf('TAGS|Tag', module).add('todas as tags', () => (
  <>
    <Tag tag={tags[0]} onDelete={onDelete} />
    <Tag tag={tags[1]} onDelete={onDelete} />
    <Tag tag={tags[2]} onDelete={onDelete} />
  </>
));
