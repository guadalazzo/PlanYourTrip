/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif'],
    },
    extend: {
      colors: {
        violet: '#4E2870',
      },
      height: {
        heading: '168px',
      },
      fontSize: {
        small: '11px',
        medium: '12px',
        regular: '16px',
        large: '24px',
        heading: '32px',
      },
    },
  },
  plugins: [],
};
