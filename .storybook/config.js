/**
 * Configuração do Storybook
 * Procura todos os arquivos .stories.js dentro de /src
 */
import { configure, addDecorator  } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

const req = require.context('../src', true, /\.stories\.(js|mdx)$/);

addDecorator(withA11y);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
