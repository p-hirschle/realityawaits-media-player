/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0a0a0a',
        'dark-sand': '#746751ff',
        'sand': '#8B7355',
        'medium-sand': '#B3A38B',
        'dark-gray': '#1a1a1a',
        'soft-white': '#e0e0e0'
      },
      fontFamily: {
        sans: ['Marlboro', 'cursive', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
