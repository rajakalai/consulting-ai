/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'purple-dark': '#1F0A33',
          'purple-light': '#9747FF',
          'purple-header': '#2D1544',
        },
      },
    },
    plugins: [],
  }