module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-white": "#F1F1F1",
        "brand-lightGray": "#E5E5E5",
        "brand-gray": "#BFBFBF",
        "brand-darkGray": "#6C6C6C",
        "brand-blue": "#2E86DE",
      },
      backgroundImage: {
        jumbotron: "url('/src/assets/img/jumbotron.png')",
      },
      spacing: {
        '80vh': '80vh',
      },
      minHeight: {
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
