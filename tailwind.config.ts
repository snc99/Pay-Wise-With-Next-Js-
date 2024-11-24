import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#458FF6",
        green: "#2ECC71",
        red: "#E74C3C",
        purple: "#9B59B6",
        yellow: "#F1C40F",
        orange: "#E67E22",
        gery: "#7D7987",
        "blue-new": "#85A7FF",
        card: "#DBEAFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
