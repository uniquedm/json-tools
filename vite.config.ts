import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// @ts-expect-error: vite-plugin-pwa does not provide types by default
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['logo.svg'],
    manifest: {
      name: 'JSON Tools',
      short_name: 'JSONTools',
      description: 'A set of tools for working with JSON data',
      theme_color: '#1976d2',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/json-tools/',
      icons: [
        {
          src: 'logo.svg',
          sizes: 'any',
          type: 'image/svg+xml',
        },
      ],
    },
  })],
  base: "/json-tools",
  build: { chunkSizeWarningLimit: 1600 },
});
