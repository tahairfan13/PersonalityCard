/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Catamaran", "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          100: "#505050",
          200: "#909090",
        },
        orange: "#FFA789",
      },
      backgroundColor: {
        basic: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
