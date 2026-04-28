import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    // Masukkin konfigurasi PWA di sini
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["pwa-192x192.png", "pwa-512x512.png"],
      manifest: {
        name: "MarkedIT Agri",
        short_name: "MarkedIT Agri",
        start_url: "/",
        description: "Cloud-Sync Field Log System for Precision Agriculture",
        theme_color: "#1a1a1a", // Warna header PWA pas dibuka (sesuaikan tema dark lu)
        background_color: "#000000", // Warna background splash screen
        display: "standalone", // Biar aplikasi muncul full-screen tanpa address bar
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
