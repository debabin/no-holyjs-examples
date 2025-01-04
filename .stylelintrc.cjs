import { stylelint } from '@siberiacancode/stylelint';

/** @type {import('stylelint').Config} */
export default {
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
