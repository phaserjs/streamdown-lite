import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  entry: ["index.tsx"],
  format: ["cjs", "esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
  external: ["react", "react-dom"],
  // Enable CSS processing and extraction
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'css',
    };
  },
  // Extract CSS to separate file
  splitting: false,
  clean: true,
});
