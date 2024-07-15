// const flowbite = require("flowbite-react/tailwind");
// import flowbite from 'flowbite-react/tailwind'
// import flowbite from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: '',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    // flowbite.content(),
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // flowbite.plugin(),
  ],
}

