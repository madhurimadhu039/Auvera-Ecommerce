import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: "#082D25", 700: "#0D3F34", 500: "#145A49" },
        gold: { DEFAULT: "#C6A66A", light: "#E3D0A5", dark: "#9C7F48" },
        ivory: { DEFAULT: "#F5F0E6", dark: "#E9E1D0" },
        ink: "#171A18",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { luxe: "0.18em" },
    },
  },
  plugins: [],
};
export default config;
