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
        'custom-blue': '#458FF6',
        'custom-green': '#2ECC71',
        'custom-red': '#E74C3C',
        'custom-purple': '#9B59B6',
        'custom-yellow': '#F1C40F',
        'custom-orange': '#E67E22',
        'custom-gery': '#7D7987',
        'custom-blue-new': '#85A7FF',
      },
    },
  },
  plugins: [],
};
export default config;
