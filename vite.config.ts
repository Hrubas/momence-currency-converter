import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/cnb/daily-rates": {
        target: "https://www.cnb.cz",
        changeOrigin: true,
        rewrite: () =>
          "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
      },
    },
  },
});
