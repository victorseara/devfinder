import twThemer from 'tailwindcss-themer';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.vue'],
  plugins: [
    twThemer({
      defaultTheme: {
        extend: {
          fontFamily: {
            sans: defaultTheme.fontFamily.mono,
          },
        },
      },
      themes: [
        {
          name: 'light',
          selectors: ['.light-mode'],
          mediaQuery: '@media (prefers-color-scheme: light)',
          extend: {
            colors: {
              'df-bg': '#F6F8FF',
              'df-text': '#222731',
              'df-text-light': '#4B6A9B',
              'df-text-gray': '#697C9A',
              'df-blue': '#0079FF',
              'df-blue-dark': '#60ABFF',
              'df-surface': '#FFF',
            },
          },
        },
        {
          name: 'dark-theme',
          selectors: ['.dark-mode'],
          mediaQuery: '@media (prefers-color-scheme: dark)',
          extend: {
            colors: {
              'df-bg': '#141D2F',
              'df-text': '#FFFFFF',
              'df-text-light': '#FFFFFF',
              'df-text-gray': '#FFFFFF',
              'df-blue': '#0079FF',
              'df-blue-dark': '#60ABFF',
              'df-surface': '#1E2A47',
            },
          },
        },
      ],
    }),
  ],
};
