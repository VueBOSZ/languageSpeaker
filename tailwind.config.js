/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color":"#34495E",
        "shades1-color":"#81B6EB",
        "shades2-color":"#5E84AB",
        "shades4-color":"#3B536B",
        "shades5-color":"#263545",
        "main-color2":"#41B883",
        "shades1-color2":"#2A7855",
        "shades2-color2":"#143828",
        "shades4-color2":"#45C48B",
        "shades5-color2":"#379E70",
        "white-color":"#FFFFFF",
        "black-color":"#000000"

      },
    },
    fontFamily: {
      Roboto: ["Roboto,sana-serif"],
    },
    container:{
      padding : "2rem",
      center : true,
    },
    screens:{
      sm : "640px",
      md : "768px",
    }
  },
  plugins: [],
}

