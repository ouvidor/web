/**
 * Testes do componente InputTag
 */
import React from 'react';
import { storiesOf } from '@storybook/react';

import InputTag from './index';
import GlobalStyle from '../../styles/global';

storiesOf('TAGS|InputTag', module)
  .add('default', () => (
    <>
      <GlobalStyle />
      <InputTag />
    </>
  ))
  .add('inserindo texto no input', () => (
    <>
      <GlobalStyle />
      <InputTag inputState />
    </>
  ))
  .add('com tag definida', () => (
    <>
      <GlobalStyle />
      <InputTag tags={['Saúde']} />
    </>
  ));
