/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        title: "Square Peg, cursive",
        content: "Yanone Kaffeesatz, sans-serif",
        roboto: "Roboto, sans-serif",
        laila: "Laila, serif",
      },
      animation: {
        bubble: "bub 2s linear 5",
      },
      keyframes: {
        bub: {
          " 0%,100": { transform: "ScaleX(0)" },
          "50%": { transform: "ScaleX(0.7)" },
        },
      },
    },
  },
  plugins: [],
};
