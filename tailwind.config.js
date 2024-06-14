/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,css}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "break-black": "#222",
      },
      fontFamily: {
        oswald: ["Oswald", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")],
  darkMode: "class",
};
