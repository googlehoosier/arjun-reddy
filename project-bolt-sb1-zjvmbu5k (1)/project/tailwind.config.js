/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F12',
        'neon-purple': '#BC00FF',
        'electric-blue': '#00F0FF',
        'dark-purple': '#1E0033',
        'dark-blue': '#001433',
        accent: '#FF2975',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 10px rgba(188, 0, 255, 0.7), 0 0 20px rgba(0, 240, 255, 0.3)',
        'neon-hover': '0 0 15px rgba(188, 0, 255, 0.9), 0 0 30px rgba(0, 240, 255, 0.5)',
        'card-glow': '0 0 15px rgba(188, 0, 255, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};