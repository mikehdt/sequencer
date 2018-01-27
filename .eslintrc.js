module.exports = {
  parserOptions: {
    ecmaVersion: '2017',
    sourceType: 'module',
  },
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    indent: ['error', 2],
  },
};
