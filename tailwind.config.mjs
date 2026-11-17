/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4B4F56',
          light: '#686D75',
          dark: '#32353A',
        },
        primaryDark: {
          DEFAULT: '#25272B',
          light: '#383B41',
          dark: '#171719',
        },
        secondary: {
          DEFAULT: '#C8B99A',
          light: '#d9cdb5',
          dark: '#b5a485',
        },
        dark: '#0B0B0C',
        light: '#F7F4EF',
        lightHover: '#EEEAE4',
        darkHover: '#171719',
        darkTheme: '#0B0B0C',
        // Eyebrow labels and small accents. Value lives in globals.css
        // (--color-accent): deep blue-grey on light, warm tan on dark.
        accent: 'var(--color-accent)',
        // Alternate section background (soft warm paper) and deep black surfaces.
        paper: '#F7F4EF',
        deep: '#050506',
      },
      fontFamily: {
        outfit: ["Plus Jakarta Sans", "sans-serif"],
        ovo: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'black': '4px 4px 0 #000',
        'white': '4px 4px 0 #fff',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blinkCaret: {
          'from, to': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
