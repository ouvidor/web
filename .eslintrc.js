module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'jsx-a11y'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',

    // remove um erro no storybook
    'import/no-extraneous-dependencies': 0,

    // permitir props-spreading, utilizado no routes/Route.js
    'react/jsx-props-no-spreading': 'off',

    // ignora autoFocus em input, eu tenho um bom motivo
    'jsx-a11y/no-autofocus': 'off'
  },
};
