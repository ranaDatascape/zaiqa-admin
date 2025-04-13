// vite.config.js
import react from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/vite/dist/node/index.js";
import cssInjectedByJsPlugin from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import { VitePWA } from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/vite-plugin-pwa/dist/index.js";
import compression from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/vite-plugin-compression2/dist/index.mjs";
import { visualizer } from "file:///D:/Datascape/codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution/kachabazar/admin/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import dns from "dns";
import path from "path";
var __vite_injected_original_dirname = "D:\\Datascape\\codecanyon-sIoDBO7b-kachabazar-react-next-js-ecommerce-solution\\kachabazar\\admin";
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  // root: "./", // Set the root directory of your project
  // base: "/", // Set the base URL path for your application
  build: {
    // outDir: "build", // comment this if you select vite as project when deploy
    assetsDir: "@/assets",
    // Set the directory for the static assets
    // sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      // Additional Rollup configuration options if needed
    },
    chunkSizeWarningLimit: 10 * 1024
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: process.env.SW_DEV === "true",
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html"
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      },
      // add this to cache all the
      // // static assets in the public folder
      // includeAssets: ["**/*"],
      includeAssets: [
        "src/assets/img/logo/*.png",
        "src/assets/img/*.png",
        "src/assets/img/*.jepg",
        "src/assets/img/*.webp",
        "favicon.ico"
      ],
      manifest: {
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        display: "standalone",
        orientation: "portrait",
        scope: ".",
        start_url: ".",
        id: ".",
        short_name: "Kachabazar - E-Commerce Website",
        name: "Kachabazar | React eCommerce Admin Dashboard",
        description: "Kachabazar : React Grocery & Organic Food Store e-commerce Admin Dashboard",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon"
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    compression(),
    visualizer({
      filename: "statistics.html",
      open: true
    })
  ],
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:5065",
        changeOrigin: true
      }
    }
  },
  define: {
    "process.env": process.env
    // global: {}, //enable this when running on dev/local mode
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTest.js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEYXRhc2NhcGVcXFxcY29kZWNhbnlvbi1zSW9EQk83Yi1rYWNoYWJhemFyLXJlYWN0LW5leHQtanMtZWNvbW1lcmNlLXNvbHV0aW9uXFxcXGthY2hhYmF6YXJcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERhdGFzY2FwZVxcXFxjb2RlY2FueW9uLXNJb0RCTzdiLWthY2hhYmF6YXItcmVhY3QtbmV4dC1qcy1lY29tbWVyY2Utc29sdXRpb25cXFxca2FjaGFiYXphclxcXFxhZG1pblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRGF0YXNjYXBlL2NvZGVjYW55b24tc0lvREJPN2Ita2FjaGFiYXphci1yZWFjdC1uZXh0LWpzLWVjb21tZXJjZS1zb2x1dGlvbi9rYWNoYWJhemFyL2FkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBjc3NJbmplY3RlZEJ5SnNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qc1wiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuXG5pbXBvcnQgZG5zIGZyb20gXCJkbnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmRucy5zZXREZWZhdWx0UmVzdWx0T3JkZXIoXCJ2ZXJiYXRpbVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gcm9vdDogXCIuL1wiLCAvLyBTZXQgdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHlvdXIgcHJvamVjdFxuICAvLyBiYXNlOiBcIi9cIiwgLy8gU2V0IHRoZSBiYXNlIFVSTCBwYXRoIGZvciB5b3VyIGFwcGxpY2F0aW9uXG5cbiAgYnVpbGQ6IHtcbiAgICAvLyBvdXREaXI6IFwiYnVpbGRcIiwgLy8gY29tbWVudCB0aGlzIGlmIHlvdSBzZWxlY3Qgdml0ZSBhcyBwcm9qZWN0IHdoZW4gZGVwbG95XG4gICAgYXNzZXRzRGlyOiBcIkAvYXNzZXRzXCIsIC8vIFNldCB0aGUgZGlyZWN0b3J5IGZvciB0aGUgc3RhdGljIGFzc2V0c1xuICAgIC8vIHNvdXJjZW1hcDogcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCIsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gQWRkaXRpb25hbCBSb2xsdXAgY29uZmlndXJhdGlvbiBvcHRpb25zIGlmIG5lZWRlZFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMCAqIDEwMjQsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGNzc0luamVjdGVkQnlKc1BsdWdpbigpLFxuXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICAvLyBlbmFibGVkOiBwcm9jZXNzLmVudi5TV19ERVYgPT09IFwidHJ1ZVwiLFxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgLyogd2hlbiB1c2luZyBnZW5lcmF0ZVNXIHRoZSBQV0EgcGx1Z2luIHdpbGwgc3dpdGNoIHRvIGNsYXNzaWMgKi9cbiAgICAgICAgdHlwZTogXCJtb2R1bGVcIixcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogXCJpbmRleC5odG1sXCIsXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFtcIioqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnfVwiXSxcbiAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDEwICogMTAyNCAqIDEwMjQsXG4gICAgICB9LFxuXG4gICAgICAvLyBhZGQgdGhpcyB0byBjYWNoZSBhbGwgdGhlXG4gICAgICAvLyAvLyBzdGF0aWMgYXNzZXRzIGluIHRoZSBwdWJsaWMgZm9sZGVyXG4gICAgICAvLyBpbmNsdWRlQXNzZXRzOiBbXCIqKi8qXCJdLFxuICAgICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgICBcInNyYy9hc3NldHMvaW1nL2xvZ28vKi5wbmdcIixcbiAgICAgICAgXCJzcmMvYXNzZXRzL2ltZy8qLnBuZ1wiLFxuICAgICAgICBcInNyYy9hc3NldHMvaW1nLyouamVwZ1wiLFxuICAgICAgICBcInNyYy9hc3NldHMvaW1nLyoud2VicFwiLFxuICAgICAgICBcImZhdmljb24uaWNvXCIsXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXG4gICAgICAgIHNjb3BlOiBcIi5cIixcbiAgICAgICAgc3RhcnRfdXJsOiBcIi5cIixcbiAgICAgICAgaWQ6IFwiLlwiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIkthY2hhYmF6YXIgLSBFLUNvbW1lcmNlIFdlYnNpdGVcIixcbiAgICAgICAgbmFtZTogXCJLYWNoYWJhemFyIHwgUmVhY3QgZUNvbW1lcmNlIEFkbWluIERhc2hib2FyZFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkthY2hhYmF6YXIgOiBSZWFjdCBHcm9jZXJ5ICYgT3JnYW5pYyBGb29kIFN0b3JlIGUtY29tbWVyY2UgQWRtaW4gRGFzaGJvYXJkXCIsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImZhdmljb24uaWNvXCIsXG4gICAgICAgICAgICBzaXplczogXCI0OHg0OFwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS94LWljb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi0yNTZ4MjU2LnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMjU2eDI1NlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi0zODR4Mzg0LnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMzg0eDM4NFwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIvaWNvbi01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBjb21wcmVzc2lvbigpLFxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgZmlsZW5hbWU6IFwic3RhdGlzdGljcy5odG1sXCIsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgIH0pLFxuICBdLFxuXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICBcIi9hcGkvXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTA2NVwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXG4gICAgLy8gZ2xvYmFsOiB7fSwgLy9lbmFibGUgdGhpcyB3aGVuIHJ1bm5pbmcgb24gZGV2L2xvY2FsIG1vZGVcbiAgfSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvXCIpLFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWw6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy9zZXR1cFRlc3QuanNcIl0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbWQsT0FBTyxXQUFXO0FBQ3JlLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sMkJBQTJCO0FBQ2xDLFNBQVMsZUFBZTtBQUN4QixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGtCQUFrQjtBQUUzQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBUmpCLElBQU0sbUNBQW1DO0FBVXpDLElBQUksc0JBQXNCLFVBQVU7QUFFcEMsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQTtBQUFBLEVBSTFCLE9BQU87QUFBQTtBQUFBLElBRUwsV0FBVztBQUFBO0FBQUE7QUFBQSxJQUVYLGVBQWU7QUFBQTtBQUFBLElBRWY7QUFBQSxJQUNBLHVCQUF1QixLQUFLO0FBQUEsRUFDOUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLHNCQUFzQjtBQUFBLElBRXRCLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQTtBQUFBLFFBRVYsU0FBUztBQUFBO0FBQUEsUUFFVCxNQUFNO0FBQUEsUUFDTixrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLFFBQy9DLCtCQUErQixLQUFLLE9BQU87QUFBQSxNQUM3QztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0EsZUFBZTtBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsSUFBSTtBQUFBLFFBQ0osWUFBWTtBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sYUFDRTtBQUFBLFFBQ0YsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLFFBQVE7QUFBQTtBQUFBLEVBRXpCO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLFlBQVksQ0FBQyxvQkFBb0I7QUFBQSxFQUNuQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
