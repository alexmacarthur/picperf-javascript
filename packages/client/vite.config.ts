import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PicPerf",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      treeshake: { moduleSideEffects: false },
    },
  },
});
