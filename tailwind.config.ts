import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        "bglp": "#FBFFF9",
        "primary": "#72CC00"
      },
      colors: {
        "primary": "#26323E",
        "secondary": "#B7B7B7",
        "green1": "#68BA00",
        "textprimary": "#72CC00",
        "btn-hover": "#56B000"
      }
    },
  },
  plugins: [],
}
export default config
