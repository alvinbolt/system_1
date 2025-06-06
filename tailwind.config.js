/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ecf8',
          100: '#c3d2f0',
          200: '#9db6e8',
          300: '#7699e0',
          400: '#5985d9',
          500: '#3b71d2',
          600: '#2a60c7',
          700: '#2250b1',
          800: '#1a409b',
          900: '#003594', // Main primary color
        },
        secondary: {
          50: '#fff8e6',
          100: '#ffebcc',
          200: '#ffdeaa',
          300: '#ffd088',
          400: '#ffc266',
          500: '#ffb444',
          600: '#ffa500', // Main secondary color
          700: '#e69500',
          800: '#cc8400',
          900: '#b37300',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'water-portal': 'water-portal 3s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-in-out',
      },
      keyframes: {
        'water-portal': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};