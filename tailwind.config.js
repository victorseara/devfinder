/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    fontFamily: {
      sans: defaultTheme.fontFamily.mono,
    },
    extend: {
      colors: {
        'df-bg': 'var(--df-bg)',
        'df-text': 'var(--df-text)',
        'df-text-light': 'var(--df-text-light)',
        'df-text-gray': 'var(--df-text-gray)',
        'df-blue': 'var(--df-blue)',
        'df-blue-dark': 'var(--df-blue-dark)',
        'df-surface': 'var(--df-surface)',
      },
    },
  },
};
