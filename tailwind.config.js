const theme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", theme.fontFamily.sans],
      },
      fontSize: {
        base: ["14px", "1.6"],
      },
    },
  },
  plugins: [],
};
