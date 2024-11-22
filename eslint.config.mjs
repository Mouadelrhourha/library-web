import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
export default [
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    'rules': {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'quotes': ['error', 'single'],
      // we want to force semicolons
      'semi': ['error', 'always'],
      // we use 2 spaces to indent our code
      'indent': ['error', 2],
      // we want to avoid extraneous spaces
      'no-multi-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1 }]
    }
  },
];
