import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        brand: "#b11217",
        mint: "#fdf0f0",
        cream: "#f8f8f8",
      },
    },
  },
  plugins: [],
} satisfies Config;
