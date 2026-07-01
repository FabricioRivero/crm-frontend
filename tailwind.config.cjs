/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e0ecff',
          200: '#c2d9ff',
          300: '#93bcff',
          400: '#5c96ff',
          500: '#3672ff',
          600: '#1f52f0',
          700: '#193fd1',
          800: '#1a35a8',
          900: '#1b3184',
        },
      },
    },
  },
  plugins: [],
}
