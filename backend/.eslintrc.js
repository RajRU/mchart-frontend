module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    indent: ['error', 2],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    camelcase: ['error', { properties: 'always' }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['serverconfig', './config'],
          ['controllers', './src/controllers'],
          ['services', './src/services'],
          ['schema', './src/schema'],
          ['policies', './src/policies'],
          ['models', './src/models'],
          ['utilities', './src/utilities'],
          ['templates', './src/templates'],
        ],
      },
    },
  },
};
