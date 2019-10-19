import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from './index';
import { suggestions } from '../../util/Examples';

// TODO stories da página Map não ocupam a página toda
storiesOf('FORM|react-select', module)
  .add('default', () => <Select name="storie" />)
  .add('com opções e label', () => (
    <Select name="storie" label="React-select" options={suggestions} />
  ))
  .add('multiplas seleções', () => (
    <Select name="storie" label="React-select" options={suggestions} multiple />
  ));
