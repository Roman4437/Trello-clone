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
        'trello-blue': '#0055D1',
        'trello-gray': '#F5F6F8'
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
}
