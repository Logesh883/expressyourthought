/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        title: "Square Peg, cursive",
        content: "Yanone Kaffeesatz, sans-serif",
      },
    },
  },
  plugins: [],
};
