import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from './index';
import GlobalStyle from '../../styles/global';

// TODO stories da página Map não ocupam a página toda
storiesOf('PAGE|Map', module).add('default', () => (
  <>
    <GlobalStyle /> <Map />
  </>
));
