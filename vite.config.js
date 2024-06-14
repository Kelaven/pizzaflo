import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist", // Où Vite construira les fichiers de production
    rollupOptions: {
      input: {
        main: "src/index.html",
      },
    },
  },
  publicDir: "../public", // Répertoire des fichiers statiques
});
