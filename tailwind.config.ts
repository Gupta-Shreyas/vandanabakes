import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          bg: '#FFF0F5',
          card: '#FFFFFF',
          border: '#FFD1DC',
          textPrimary: '#2D1810',
          textSecondary: '#6B5B53',
          accent: '#E63946',
          star: '#FFD700',
        }
      },
      keyframes: {
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        'fade-out-up': 'fade-out-up 1s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
export default config
