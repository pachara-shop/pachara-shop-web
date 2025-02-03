module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'error', // เพิ่มกฎนี้เพื่อแสดงข้อผิดพลาดเมื่อใช้ any type
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'warn',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
