import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
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
  },
];
