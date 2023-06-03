import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: defaultTheme.fontFamily.mono,
      },
    },
    plugins: [],
  },
};
