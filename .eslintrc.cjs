/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier', 'plugin:storybook/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'vue/require-default-prop': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
