/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B6CB0',
        secondary: '#38B2AC',
        'accent-success': '#48BB78',
        'accent-error': '#F56565',
        'neutral-100': '#F7FAFC',
        'neutral-200': '#EDF2F7',
        'neutral-300': '#E2E8F0',
        'neutral-400': '#CBD5E0',
        'neutral-500': '#A0AEC0',
        'neutral-600': '#718096',
        'neutral-700': '#4A5568',
        'neutral-800': '#2D3748',
        'neutral-900': '#1A202C',
        'text-primary': '#2D3748',
        'text-secondary': '#718096',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F7FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideInUp': 'slideInUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};