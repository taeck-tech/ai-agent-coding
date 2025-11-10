import { defineConfig } from "tsup";

export default defineConfig([
  {
    format: ["cjs", "esm"],
    entry: ["src/index.ts"],
    splitting: false,
    minify: true,
    dts: true,
    clean: false,
    banner: {
      js: '"use client";',
    },
    tsconfig: "./tsconfig.json",
  },
]);
