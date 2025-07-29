/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "strength-weak": "#ef4444",
        "strength-fair": "#f97316",
        "strength-good": "#eab308",
        "strength-strong": "#22c55e",
      },
    },
  },
  plugins: [],
};
