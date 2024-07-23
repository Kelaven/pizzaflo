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
