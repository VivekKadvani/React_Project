/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    colors: {
      // Configure your color palette here
      'pink': '#F20D7B',
      'dim_black': '#1A1A1D',
      'white_text': '#D9D9D9',
      'grey': '#484848'
    },
    fontFamily: {
      'vesting': ['Bruno Ace SC', 'Georgia, Cambria', 'Times New Roman', 'Times', 'serif'],
      'form': ['Bruno Ace', 'cursive',]
    },
    dropShadow: {
      '3xl': '0  5px 10px rgba(242, 13, 123, 1)',

    }
  },
  plugins: [],
}

