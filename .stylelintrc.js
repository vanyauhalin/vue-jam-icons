module.exports = {
  extends: [
    'stylelint-config-airbnb',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
    'max-nesting-depth': 4,
  },
};
