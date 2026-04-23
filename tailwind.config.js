/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables manual dark mode toggling via .dark class
  theme: {
    extend: {
      colors: {
        // Use CSS variables so they adapt to light/dark mode automatically
        background: 'rgb(var(--background) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          light: 'rgb(var(--primary-light) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
          light: 'rgb(var(--danger-light) / <alpha-value>)',
        },
        card: 'rgb(var(--card-bg) / <alpha-value>)',
        border: 'rgb(var(--border-light) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"League Spartan"', 'sans-serif'],
      },
      fontSize: {
        'heading-l': ['36px', { lineHeight: '33px', letterSpacing: '-1px', fontWeight: '700' }],
        'heading-m': ['24px', { lineHeight: '22px', letterSpacing: '-0.75px', fontWeight: '700' }],
        'heading-s': ['15px', { lineHeight: '24px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'heading-s-variant': ['15px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '700' }],
        'body': ['13px', { lineHeight: '18px', letterSpacing: '-0.1px', fontWeight: '500' }],
        'body-variant': ['13px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}