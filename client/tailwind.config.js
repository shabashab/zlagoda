/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      screens: {
        lg: '1800px'
      }
    },
    extend: {
      colors: {
        dark: '#6278F7',
        darker: '#2D2E52',
        light: '#F2F2F2',
        lighter: '#F9FAFF',
        accent: '#95FFD4',
        'accent-lighter': '#95FFD4'
      }
    },
  },
  plugins: [],
}

