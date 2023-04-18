/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#f5190a",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      opensans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scroll-behavior")(),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
