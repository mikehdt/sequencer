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
    indent: ['error', 2, {
      'SwitchCase': 1
    }],
    'space-infix-ops': ['error'],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'audio',
      ],
    }]
  },
};
