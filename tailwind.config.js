/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        display: ['64px', { fontWeight: '900', letterSpacing: '-0.05em' }],
        title: ['32px', { fontWeight: '700', fontStyle: 'italic', letterSpacing: '-0.02em' }],
        subtitle: ['20px', { fontWeight: '600' }],
        text: ['16px', { fontWeight: '400' }],
        highlight: ['16px', { fontWeight: '600', fontStyle: 'italic' }],
        label: ['14px', { fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em' }],
        caption: ['12px', { fontWeight: '400' }],
      },
      colors: {
        primary: {
          main: 'var(--color-primary-main)',
          light: 'var(--color-primary-light)',
          soft: 'var(--color-primary-soft)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          main: 'var(--color-secondary-main)',
          light: 'var(--color-secondary-light)',
          soft: 'var(--color-secondary-soft)',
          dark: 'var(--color-secondary-dark)',
        },
        white: {
          pure: 'var(--color-white-pure)',
          base: 'var(--color-white-base)',
          soft: 'var(--color-white-soft)',
        },
        black: {
          main: 'var(--color-black-main)',
          soft: 'var(--color-black-soft)',
          light: 'var(--color-black-light)',
        },
        gray: {
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          700: 'var(--color-gray-700)',
        }
      },
      fontFamily: {
        sans: ["Helvetica Now", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
      }
    },
  },
  plugins: [],
}
