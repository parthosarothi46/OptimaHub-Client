import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/lib/utils": path.resolve(__dirname, "./src/lib/utils"),
      "@/components/ui": path.resolve(__dirname, "./src/components/ui"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
