/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#000000',
        'secondary': '#171F29',
      },
      colors: {
        'primary': '#ffff',
        'secondary': '#000'
      }

    },
  },
  plugins: [],
}

