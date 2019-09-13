import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Map from './index';
import GlobalStyle from '../../styles/global';

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
`;

// TODO stories da página Map não ocupam a página toda
storiesOf('PAGE|Map', module).add('default', () => (
  <>
    <GlobalStyle />
    <Wrapper>
      <Map />
    </Wrapper>
  </>
));
