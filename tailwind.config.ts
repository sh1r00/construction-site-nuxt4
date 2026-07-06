import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8ebf0',
          100: '#c5cdd9',
          200: '#9fabbd',
          300: '#7a89a1',
          400: '#5e708d',
          500: '#425779',
          600: '#3b4f71',
          700: '#324566',
          800: '#2a3c5c',
          900: '#1c2b4a',
          950: '#0f1a2e',
        },
        accent: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        },
        surface: {
          light: '#f8f9fb',
          dark: '#121828',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Ethiopic', 'sans-serif'],
        display: ['Oswald', 'Noto Sans Ethiopic', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.12)',
        'card-hover': '0 10px 25px rgba(0,0,0,.1), 0 4px 10px rgba(0,0,0,.06)',
        'header': '0 2px 10px rgba(0,0,0,.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
