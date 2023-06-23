/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
       "slate-10" : "#1e293b",
       "slate-20" : "#475569" ,
       "blue-10" : "#2563eb" ,
       
      },
      fontFamily : {
        montserrat : ["Montserrat, sans-serif"],
        rubik : ["Rubik, sans-serif"]
      },
    },
  },
  plugins: [],
}

