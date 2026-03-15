/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        gold: '#D4AF37',
        white: '#FFFFFF',
        'gold-light': '#E5C76B',
        'gold-dark': '#B8962E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            a: {
              color: '#D4AF37',
              '&:hover': {
                color: '#E5C76B',
              },
            },
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#FFFFFF',
            },
            h3: {
              color: '#FFFFFF',
            },
            strong: {
              color: '#D4AF37',
            },
            code: {
              color: '#D4AF37',
            },
            blockquote: {
              color: '#FFFFFF',
              borderLeftColor: '#D4AF37',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
