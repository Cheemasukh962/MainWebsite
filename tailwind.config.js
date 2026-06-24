/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ki: { 50: '#eaf4ff', 200: '#9fd0ff', 400: '#37a0ff', 600: '#1565c0', 900: '#06234a' },
        gold: '#f2c14e',
      },
    },
  },
  plugins: [],
}
