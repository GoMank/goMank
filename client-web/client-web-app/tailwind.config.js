module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'gomank-blue': '#0386ee',
        'gomank-yellow': '#FEC900',
        'gomank-gray': '#E1E1E1',
        'gomank-white': '#F6F6F6'
      },
      backgroundImage: {
        'landing': "url('/src/landing-img.jpg')",
        
      }
    },
    
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
