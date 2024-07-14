const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif'],
    },
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        violet: '#4E2870',
        lila: '#9B51E0',
        stone: '#DDDDDD',
      },
      height: {
        heading: '168px',
      },
      fontSize: {
        small: '11px',
        medium: '12px',
        price: '14px',
        regular: '16px',
        title: '18px',
        large: '24px',
        heading: '32px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
