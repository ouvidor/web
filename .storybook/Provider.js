import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from '../src/styles/global';
import { store } from '../src/store';

// Higher Order Component (HOC), envolve as Stories
const ProviderWrapper = story => (
  <Provider store={store}>
    <GlobalStyle />
    {story()}
  </Provider>
);

export default ProviderWrapper;
