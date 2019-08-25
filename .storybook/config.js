/**
 * Configuração do Storybook
 * Procura todos os arquivos .stories.js dentro de /src
 */
import { configure } from '@storybook/react';

const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
