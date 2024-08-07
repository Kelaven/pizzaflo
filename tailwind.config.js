/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,css,php}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow-black': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      },
      colors: {
        "break-black": "#222",
        "break-black-20": "rgba(34, 34, 34, 0.2)",
        "overlay-black": "#333",
        "logo-green": "#00925A",
        "logo-red": "#DF2416",
      },
      fontFamily: {
        oswald: ["Oswald", "Arial", "sans-serif"],
        anton: ["Anton", "Impact", "Arial Black", "sans-serif"],
        openSans: ["Open Sans", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        'xxs': '0.625rem',
        'lg-md': '1.2315rem',
        '1.5xl': ['1.375rem', {
          lineHeight: '1.75rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        }],
        '2.5xl': ['1.78rem', {
          lineHeight: '2.125rem',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        }],
        '7.5xl': ['5.3381rem', {
          lineHeight: '1',
        }],
      },
      letterSpacing: {
        'normal-md': '0.0125em',
        'wide-md': '.04em',
      },
      spacing: {
        '15': '3.75rem',
      },
      screens: {
        'max-md-sm': { 'max': '390px' },
        'max-sm': { 'max': '640px' },
        'max-lg': { 'max': '1024px' },
      },
      width: {
        '10.5/12': '85%',
      },
      height: {
        '540px': '540px',
        '88px': '88px',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
  darkMode: "class",
};
