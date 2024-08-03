module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        turboBg: '#000080',
        turboText: '#FFFFFF'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
