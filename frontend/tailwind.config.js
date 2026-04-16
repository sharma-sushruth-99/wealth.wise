/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c0c0c',
        bg2: '#131313',
        bg3: '#1a1a1a',
        bg4: '#222222',
        gold: '#c9a84c',
        gold2: '#e8c97a',
        golddim: '#7a6530',
        text: '#f0ece4',
        muted: '#888480',
        muted2: '#555250',
        border: '#2a2720',
        border2: '#3a3530',
        green: '#4caf84',
        red: '#e05a5a',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
