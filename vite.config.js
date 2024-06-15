import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: '.'
        },
        // {
        //   src: 'node_modules/preline/dist/preline.js',
        //   dest: 'assets/js' // Vous pouvez choisir le répertoire de destination souhaité
        // }
      ]
    })
  ],
  root: "src",
  build: {
    outDir: "../dist", // Où Vite construira les fichiers de production
    rollupOptions: {
      input: {
        main: "src/index.html",
      },
    },
  },
  optimizeDeps: {
    include: ['preline']
  },
  publicDir: "../public", // Répertoire des fichiers statiques
});
