module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'max-len': [1, { "code": 120 }],
    'no-tabs': 1,
    'no-mixed-spaces-and-tabs': 1,
    'no-param-reassign': 0,
    'comma-dangle': 1,
    'no-unused-vars': 1,
    'arrow-parens': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
