import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3D6375',
        },
        secondary: {
          DEFAULT: '#75523D',
        },
        black: {
          100: '#0C1418',
          75: '#484F52',
          50: '#858A8C',
          25: '#C2C4C5',
          10: '#E7E8E8',
          5: '#F3F3F3',
        },
      },
    },
  },
  plugins: [],
}
export default config
