/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          main: "#000000",
          medium: "#202B38",
          dark: "#1A222C",
        },
        blue: {
          dark: "rgb(34, 43, 55)",
        },
        purple: {
          medium: "#8E68E5",
        },
      },
    },
  },
  plugins: [],
};
