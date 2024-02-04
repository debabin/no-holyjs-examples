const { prettier } = require('@siberiacancode/prettier');

/** @type {import('prettier').Config} */
module.exports = {
  ...prettier,
  plugins: ['prettier-plugin-tailwindcss']
};
