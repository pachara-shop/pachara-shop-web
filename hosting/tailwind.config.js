const shadcnConfig = require('./shadcn.config.js');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...shadcnConfig.theme.extend,
    },
  },
  plugins: [...shadcnConfig.plugins],
};
