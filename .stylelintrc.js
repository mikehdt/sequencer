module.exports = {
  plugins: ['stylelint-scss'],
  extends: 'stylelint-config-standard',
  rules: {
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['local', 'global'] // css-modules
    }],
  },
};
