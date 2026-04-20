/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          yellow: '#FFF000',
          blue: '#3A86FF',
          green: '#00F5D4',
          pink: '#FF006E',
          purple: '#8338EC',
          black: '#1A1A1A',
          white: '#F8F9FA',
          card: '#FFFFFF',
          red: '#FF4D4D'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(26,26,26,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(26,26,26,1)',
      }
    },
  },
  plugins: [],
}
