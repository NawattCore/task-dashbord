import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const importPlugin = await import('eslint-plugin-import');
const filenamesPlugin = await import('eslint-plugin-filenames');

export default [
  // Next.js + TypeScript base config
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // "@typescript-eslint/naming-convention": [
      //   "error",
      //   { selector: "default", format: ["camelCase", "PascalCase"] },
      //   { selector: "function", format: ["camelCase", "PascalCase"] },
      //   { selector: "variableLike", format: ["camelCase", "PascalCase"] },
      //   { selector: "typeLike", format: ["PascalCase"] },
      //   {
      //     selector: "interface",
      //     format: ["PascalCase"],
      //     custom: {
      //       regex: "^I[A-Z]",
      //       match: false,
      //     },
      //   },
      // ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin.default,
      filenames: filenamesPlugin.default,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling'],
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
