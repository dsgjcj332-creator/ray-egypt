import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ray: {
          gold: '#FDB813',
          blue: '#1E3A8A',
          white: '#FFFFFF',
          black: '#1A1A1A',
          orange: '#F97316',
          gray: '#F3F4F6'
        }
      },
      fontFamily: {
        sans: ['var(--font-cairo)'],
        dancing: ['var(--font-dancing)'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;