/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "current",
      custom: {
        "muted-sky-blue": "#506477",
        "less-muted-sky-blue": "#7390aa",
        "sky-blue": "#91b4d5",
        "light-sky-blue": "#add7ff",
        white: "#e4f0fb",
        "light-green": "#27e8a7",
        green: "#32ae85",
        "muted-green": "#42675a",
        red: "#df4576",
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
  },
};
