import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import phpPlugin from 'vite-plugin-php';
// import usePHP from 'vite-plugin-php';

export default defineConfig({
  root: "src",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: '.'
        },
      ]
    }),
    // phpPlugin(),
    // usePHP({
    //   entry: ['src/**/*.php'],
    // }),
  ],
  build: {
    outDir: "../dist", // Où Vite construira les fichiers de production
    rollupOptions: {
      input: {
        main: "src/index.html",
      },
    },
  },
  // server: {
  //   // port: 3000,
  //   proxy: {
  //     '/index.php': {
  //       // Change the URL according to your local web server environment
  //       target: 'http://localhost/pizzaflo/src/',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //     // Include other *.php sources called from your web app if necessary
  //   }
  // },
  optimizeDeps: {
    include: ['preline']
  },
  publicDir: "../public", // Répertoire des fichiers statiques
});
