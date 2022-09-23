module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        7: "repeat(7, minmax(110px, 1fr))",
      },
    },
    plugins: [require("@tailwindcss/forms"), require("tailwindcss-animation-delay")],
  },
};
