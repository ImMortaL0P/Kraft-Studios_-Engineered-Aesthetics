import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Kraft-Studios_-Engineered-Aesthetics/",
  plugins: [
    tanstackStart({
      spa: {
        enabled: true
      }
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ]
});
