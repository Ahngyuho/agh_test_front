import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       // 프록시할 경로
  //       // target: "http://3.34.95.146:3000/", // 대상 서버
  //       target: "http://10.10.10.201:8081/", // 대상 서버
  //       changeOrigin: true, // 대상 서버의 호스트 헤더 변경 여부
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
