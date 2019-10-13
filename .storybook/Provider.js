import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../src/store';

const ProviderWrapper = (story) => (
  <Provider store={store}>{story()}</Provider>
);

export default ProviderWrapper;
