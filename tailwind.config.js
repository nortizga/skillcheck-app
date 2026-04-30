/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          sage: '#839788',
          'sage-dark': '#6b7f70',
          'sage-light': '#a8b8ac',
          cream: '#EEE0CB',
          'cream-light': '#F7F0E3',
          'cream-dark': '#E2D1B6',
          taupe: '#BAA898',
          'taupe-dark': '#9A8A7A',
          'taupe-light': '#D4C8BC',
          blue: '#BFD7EA',
          'blue-dark': '#8FBAD5',
          'blue-light': '#E3EFF7',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
