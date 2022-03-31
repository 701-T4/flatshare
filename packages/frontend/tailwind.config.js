module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        land_page_bg_start: '#238778',
        land_page_bg_end: '#2596A4',
        btn_green: '#23B09C',
        btn_red: '#D46E6E',
      },
      backgroundImage: {
        logo: "url('/public/logo.png')",
        house: "url('/public/house.png')",
      },
    },
  },
  plugins: [],
};
