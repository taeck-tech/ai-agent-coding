/** @type {import('tailwindcss').Config} */
import base from "@repo/tailwind-preset/tailwind-preset.js";

module.exports = {
  presets: [base],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
    },
  },
  plugins: [],
};
