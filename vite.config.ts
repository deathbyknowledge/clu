import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  server: { allowedHosts: ["clu.grid"] },
  plugins: [react(), cloudflare()],
});
