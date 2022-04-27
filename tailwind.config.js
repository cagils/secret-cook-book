module.exports = {
  content: ['src/pages/**/*.{js,ts,jsx,tsx}', 'src/components/**/*.{js,ts,jsx,tsx}'],
  // Ensure these match with .storybook/preview.js
  theme: {
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
  },
  plugins: [],
};
