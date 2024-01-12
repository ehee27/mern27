import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Fjalla One'],
      // sans2: ['sans-serif', 'Kanit'],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['corporate'],
  },
}
