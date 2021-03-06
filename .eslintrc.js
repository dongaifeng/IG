module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/eqeqeq': 'warning',
    'vue/html-indent': 'warning',
    "no-unused-vars": [1, {
      "vars": "all",
      "args": "none"
    }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}