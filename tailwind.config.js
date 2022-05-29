module.exports = {
  content: ["./src/**/*.njk", "./src/**/*.html", "./src/**/*.md"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      orange: "#ee5d52",
      mint: "#1cac9c",
      blue: "#4e5569",
      grey: "#b7b8be"
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
