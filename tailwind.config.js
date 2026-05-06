/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gs: {
          navy: {
            DEFAULT: '#003366',
            dark: '#002244',
            light: '#004488',
          },
          gold: {
            DEFAULT: '#F6C453',
            dark: '#E0B040',
            light: '#F8D07B',
          },
          red: '#FF0000',
          gray: {
            light: '#F8F9FA',
            DEFAULT: '#F1F3F5',
            dark: '#333333',
            darker: '#1A1A1A',
          }
        },
        luxury: {
          gold: {
            light: '#E5C76B',
            DEFAULT: '#D4AF37',
            dark: '#A68A2D',
          },
          black: {
            soft: '#1F1F1F',
            DEFAULT: '#141414',
            deep: '#0A0A0A',
          },
          white: {
            soft: '#F5F5F7',
            DEFAULT: '#FFFFFF',
          }
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'grid-line': 'grid-line 3s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'grid-line': {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
