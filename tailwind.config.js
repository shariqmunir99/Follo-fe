/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rakkas: ["Rakkas-Regular", "sans-serif"],
        PoppinsRegular: ["Poppins-Regular", "sans-serif"],
        PoppinsBold: ["Poppins-Bold", "sans-serif"],
        PoppinsSemiBold: ["Poppins-SemiBold", "sans-serif"],
        PoppinsLight: ["Poppins-Light", "sans-serif"],
        PoppinsExtraLight: ["Poppins-ExtraLight", "sans-serif"],
        PoppinsExtraBold: ["Poppins-ExtraBold", "sans-serif"],
      },
      colors: {
        Main: "#100425",
        MainLight: "#220A4B",
        Vivid: "#FAFF00",
        Text: "#F2EFF7",
      },
    },
  },
  plugins: [],
};

// Exporting colors and fonts
module.exports.colors = module.exports.theme.extend.colors;
module.exports.fonts = module.exports.theme.extend.fontFamily;