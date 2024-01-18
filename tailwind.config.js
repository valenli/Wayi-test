/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    screens: {
      'xl': {'max': '1279px'},


      'lg': {'max': '1023px'},


      'md': {'max': '767px'},


      'sm': {'max': '639px'},

    }
  },
  plugins: [require("daisyui")],
}

