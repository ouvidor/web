import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Map from './index';
import GlobalStyle from '../../styles/global';

import { Manifestation } from '../../util/Examples';

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
`;

const manifestationsState = [Manifestation];

// TODO stories da página Map não ocupam a página toda
storiesOf('PAGE|Map', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <Wrapper>
        <Map />
      </Wrapper>
    </>
  ))
  .add('com manifestações', () => (
    <>
      <GlobalStyle />
      <Wrapper>
        <Map manifestationsState={manifestationsState} />
      </Wrapper>
    </>
  ));
