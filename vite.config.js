import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path'; // pour le multipage

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
  ],
  build: {
    outDir: "../dist", // Où Vite construira les fichiers de production
    rollupOptions: {
      input: { // pour le multipage
        main: resolve(__dirname, 'src/index.html'),
        legalNotice: resolve(__dirname, 'src/pages/legalNotice.html'),
        privacyPolicy: resolve(__dirname, 'src/pages/privacyPolicy.html'),
        findMe: resolve(__dirname, 'src/pages/findMe.html'),

      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false, // Désactivation de la vérification SSL en développement
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    cors: false
  },
  optimizeDeps: {
    include: ['preline']
  },
  publicDir: "../public", // Répertoire des fichiers statiques
});
