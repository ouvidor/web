import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Settings from './index';
import { categories, status, types, secretariats } from '../../util/Examples';

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
`;

storiesOf('PAGE|Settings', module)
  .add('default', () => (
    <Wrapper>
      <Settings />
    </Wrapper>
  ))
  .add('com dados prontos', () => (
    <Wrapper>
      <Settings
        categoriesState={categories}
        statusState={status}
        typesState={types}
        secretariatsState={secretariats}
      />
    </Wrapper>
  ));
