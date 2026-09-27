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
        // The backend sets its auth cookie with `Secure; SameSite=None`, which
        // Safari refuses to store on http://localhost. Strip those flags for the
        // dev proxy so the cookie works locally in every browser.
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const setCookie = proxyRes.headers["set-cookie"];
            if (!setCookie) return;

            proxyRes.headers["set-cookie"] = setCookie.map((cookie) =>
              cookie
                .replace(/;\s*secure/gi, "")
                .replace(/;\s*samesite=none/gi, ""),
            );
          });
        },
      },
    },
  },
});
