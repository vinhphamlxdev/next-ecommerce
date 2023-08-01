/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#333",
        bgMenu: "#edede9",
        saveBg: "#8ac926",
        activeBg: "#8ac926",
        bgPrimary: "#ff0000",
        bgCheckout: "rgb(0, 180, 216)",
        bgText: "#8c909",
        bluePrimary: "#0089ff",
        borderPrimary: "#ebebeb",
      },
    },
  },
  plugins: [],
};
