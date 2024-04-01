/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  // tailwindcss
  tailwindAttributes: ['theme'],
  tailwindFunctions: ['twMerge', 'createTheme'],
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'lf',
};
