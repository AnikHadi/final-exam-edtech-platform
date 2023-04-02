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
        custom_disable_bg_btn: "bg-red-400",
        custom_disable_text_btn: "text-gray-300",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
