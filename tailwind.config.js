/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    animation: {
      enter: 'enter .2s ease-out',
      leave: 'leave .15s ease-in forwards',
    },
    keyframes: {
      enter: {
        '0%': {
          opacity: '0',
          transform: 'translate(2rem)',
        },
        '100%': {
          opacity: '1',
          transform: 'translate(0)',
        },
      },
      leave: {
        '0%': {
          opacity: '1',
          transform: 'translate(0)',
        },
        '100%': {
          opacity: '0',
          transform: 'translate(2rem)',
        },
      },
    },
  },
  plugins: [],
}
