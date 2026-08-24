import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const disableDevClient = {
  name: "disable-vite-client-without-hmr",
  apply: "serve",
  transformIndexHtml: {
    order: "post",
    handler(html) {
      return html.replace(
        /\s*<script type="module" src="\/\@vite\/client"><\/script>/,
        ""
      );
    },
  },
};

export default defineConfig({
  plugins: [react(), disableDevClient],
  server: {
    strictPort: true,
    hmr: false,
  },
});
