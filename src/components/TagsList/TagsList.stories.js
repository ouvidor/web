import React from 'react';
import { storiesOf } from '@storybook/react';

import TagsList from './index';

const tags1 = [{ id: 1, title: 'Saúde' }];
const tags2 = [{ id: 1, title: 'Saúde' }, { id: 2, title: 'Crime' }];
const tags3 = [
  { id: 1, title: 'Saúde' },
  { id: 2, title: 'Crime' },
  { id: 3, title: 'Eletricidade' },
  { id: 4, title: 'Desmatamento' },
];

storiesOf('TagsList', module)
  .add('1 tag', () => <TagsList tags={tags1} />)
  .add('2 tags', () => <TagsList tags={tags2} />)
  .add('extrapolando o wraper', () => (
    <div
      style={{
        background: '#999',
        width: 200,
        padding: 10,
        borderRadius: 4,
      }}
    >
      <TagsList tags={tags3} />
    </div>
  ));
