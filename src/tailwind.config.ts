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
        firstColor: '#163172',
        secondColor: '#1e56a0',
        midColor: '#aed0ff',
        thirdColor: '#d6e4f0',
        fourthColor: '#f6f6f6'
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class"
    })
  ],
};
export default config;
