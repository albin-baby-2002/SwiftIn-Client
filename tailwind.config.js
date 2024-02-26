/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Texturina: ["Texturina"],
        Righteous: ["Righteous"],
        Sen: ["Sen"],
        Inter: ["Inter"],
        Merriweather: ["Merriweather"],
      },
    },
  },
  plugins: [],
};

