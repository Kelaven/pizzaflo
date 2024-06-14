/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,css}",
    "./node_modules/tw-elements/js/**/*.js",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "break-black": "#222",
      },
      fontFamily: {
        oswald: ["Oswald", "Arial", "sans-serif"],
      },
      screens: {
        'max-sm': { 'max': '640px' },
      },
    },
  },
  plugins: [
    // require("tw-elements/plugin.cjs"),
    require('preline/plugin'),
  ],
  darkMode: "class",
};
