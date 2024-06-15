/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,css}",
    // "./node_modules/tw-elements/js/**/*.js",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "break-black": "#222",
        "overlay-black": "#333",
      },
      fontFamily: {
        oswald: ["Oswald", "Arial", "sans-serif"],
      },
      screens: {
        'max-sm': { 'max': '640px' },
      },
      backgroundImage: {
        'hero': "url('/assets/img/hero-paysage-60.jpg')",
      },
    },
  },
  plugins: [
    // require("tw-elements/plugin.cjs"),
    require('preline/plugin'),
  ],
  darkMode: "class",
};
