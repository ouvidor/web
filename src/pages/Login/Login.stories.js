import React from 'react';
import { storiesOf } from '@storybook/react';

import Login from './index';
import GlobalStyle from '../../styles/global';

storiesOf('Page Login', module).add('default', () => (
  <>
    <GlobalStyle /> <Login />
  </>
));
