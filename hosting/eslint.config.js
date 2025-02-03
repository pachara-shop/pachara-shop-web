const ts = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      react: react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'error', // เพิ่มกฎนี้เพื่อแสดงข้อผิดพลาดเมื่อใช้ any type
      semi: ['off', 'always'],
      quotes: ['off', 'single'],
      indent: ['off', 2],
      'no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
  {
    files: ['*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  },
];
