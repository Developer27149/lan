import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fg from "fast-glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "watch-external", // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
      async buildStart() {
        const files = await fg(["public/**/*"]);
        for (let file of files) {
          this.addWatchFile(file);
        }
      },
    },
  ],
  build: {
    outDir: "lan_crx",
    watch: {},
    sourcemap: true,
  },
});
