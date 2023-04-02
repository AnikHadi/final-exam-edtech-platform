/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_White: "#CAD5E2",
        custom_gray_50: "rgb(249 250 251 / var(--tw-text-opacity))",
        custom_error_ring: "rgb(239 68 68 / var(--tw-text-opacity))",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
