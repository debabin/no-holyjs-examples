const { stylelint } = require('@siberiacancode/stylelint');

/** @type {import('stylelint').Config} */
module.exports = {
  ...stylelint,
  rules: {
    ...stylelint.rules,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ]
  }
};
