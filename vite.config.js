import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    hmr: false,
  },
  optimizeDeps: {
    force: true,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
