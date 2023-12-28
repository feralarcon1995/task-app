/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        'dark': '#191919',
      },
      
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}