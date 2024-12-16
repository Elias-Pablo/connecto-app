/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Definir la paleta de colores
        primary: {
          DEFAULT: "#1B2E3C", // NAVY BLUE
          light: "#2B4257",   // MIDNIGHT BLUE
          dark: "#091235",    // ROYAL BLUE
        },
        accent: {
          gold: "#D6AD60",
          tan: "#B68D40",
          cream: "#F8F3EB",
        },
        neutral: {
          light: "#F4EBD0",  // CREAM
          medium: "#7F6951", // SHADOW
          dark: "#201315",   // BLACK
        },
        highlight: {
          crimson: "#4B0000",
          salmon: "#E76D57",
        },
      },
    },
  },
  plugins: [],
};
