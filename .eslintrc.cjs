module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      ts: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['warn', 'always'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-console': 1,
    'prettier/prettier': 'error',
  },
};
