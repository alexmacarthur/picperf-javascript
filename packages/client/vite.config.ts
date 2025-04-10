import { defineConfig } from "vite";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  esbuild: {
    drop: isProd ? ["console", "debugger"] : [],
  },
  build: {
    minify: "terser",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PicPerf",
      fileName: (format) => {
        if (format === "umd") {
          return "picperf.js";
        }

        return `picperf.${format}.js`;
      },
    },
    rollupOptions: {
      treeshake: { moduleSideEffects: false },
    },
  },
});
