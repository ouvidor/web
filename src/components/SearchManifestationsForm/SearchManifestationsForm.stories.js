import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchManifestationsForm from './index';
import { suggestions } from '../../util/Examples';

// TODO stories da página Map não ocupam a página toda
storiesOf('FORM|Form', module)
  .add('default', () => (
    <SearchManifestationsForm
      onSubmit={data => console.log(data)}
      tagsOptions={suggestions}
      loading={false}
    />
  ))
  .add('carregando', () => (
    <SearchManifestationsForm
      onSubmit={data => console.log(data)}
      tagsOptions={suggestions}
      loading
    />
  ));
