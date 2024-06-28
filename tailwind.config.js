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
      }
      // backgroundImage: {
      //   'hero': "url('/assets/img/hero-paysage-60.jpg')",
      // },
    },
  },
  plugins: [
    // require("tw-elements/plugin.cjs"),
    require('preline/plugin'),
  ],
  darkMode: "class",
};
