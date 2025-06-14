/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B5CF6',
        'primary-dark': '#7C3AED',
        'secondary': '#F5F6FA',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'page-bg': '#EEF2FF',
        'purple-light': '#EEF2FF',
        'purple-mid': '#C7D2FE',
        'blue-light': '#DBEAFE',
        'blue-mid': '#93C5FD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out'
      }
    },
  },
  plugins: [],
} 