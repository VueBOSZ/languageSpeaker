/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color":"#3498db",
        "main-color2":"#FBE8CF",
        "compound2-color":"#4B4E75",
        "compound4-color":"#E0A06E",
        "compound5-color":"#A84318",
        "analogous1-color":"#2C3AE8",
        "analogous2-color":"#2E70F2",
        "analogous4-color":"#2ED7F2",
        "analogous5-color":"#2CE8CF",
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

