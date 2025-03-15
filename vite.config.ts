import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "https://woahbundie.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
