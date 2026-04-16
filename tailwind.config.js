/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-dark': 'rgb(var(--color-dark) / <alpha-value>)',
        'tech-darker': 'rgb(var(--color-darker) / <alpha-value>)',
        'tech-card': 'rgb(var(--color-card) / <alpha-value>)',
        'tech-blue': 'rgb(var(--color-blue) / <alpha-value>)',
        'tech-purple': 'rgb(var(--color-purple) / <alpha-value>)',
        'tech-gray': 'rgb(var(--color-gray) / <alpha-value>)',
        'tech-light': 'rgb(var(--color-light) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
