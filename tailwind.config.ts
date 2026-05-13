import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Pretendard",
          "Pretendard Variable",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        wallet: {
          bg: "#000000",
          card: "#1c1c1e",
          surface: "#2c2c2e",
          divider: "rgba(255,255,255,0.12)",
          mute: "#8e8e93",
          text: "#f5f5f7",
        },
        status: {
          ontime: "#30d158",
          delayed: "#ff9f0a",
          arrived: "#0a84ff",
          cancelled: "#ff453a",
        },
        airline: {
          ke: "#00256C",
          keAccent: "#5BA4D8",
        },
      },
      boxShadow: {
        pass: "0 20px 60px -20px rgba(0,0,0,0.6), 0 8px 24px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
