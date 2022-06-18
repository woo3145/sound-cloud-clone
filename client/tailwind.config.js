module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "960px",
      md: "1080px",
      lg: "1240px",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#F50",
          neutral: "#333",
          "base-100": "#fff",
        },
      },
      "dark",
    ],
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
};
