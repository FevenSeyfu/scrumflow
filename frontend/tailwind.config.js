/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
    },
    colors: {
      "dark-blue" : '#2D4059',
      "olive-green" : "#6E9934",
      "light-gray" : '#F7F7F8',
      "white" : '#fff',
      "black" : "#000",
      'blue': '#0d6efd',
      'red' : '#dc3545',
      'green' : '#198754'
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

