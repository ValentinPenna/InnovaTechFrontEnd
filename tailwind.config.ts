import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "outfit": ["Danfo", "sans-serif"],
        "rubik": ["Rubik", "sans-serif"],
      },
      colors: {
        "safetyOrange": "#FF7900",
        "persianIndigo": "#3C096C",
        "frenchViolet": "#7B2CBF",
        "aliceBlue": "#F4FAFF",
      },
    },
  },
  plugins: [],
};
export default config;
