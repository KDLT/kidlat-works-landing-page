import { defineConfig } from "vite";

// For Vite v7 and later, the recommended way to remove console logs
// in production is using the 'esbuild.drop' configuration.
// This tells esbuild to remove 'console' and 'debugger' statements
// during the build process.
export default defineConfig({
  esbuild: {
    drop: ["console", "debugger"],
  },
});
