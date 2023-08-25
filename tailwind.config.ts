import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        21: '5.25rem',
        100: '25rem',
      },
    },
  },
  plugins: [],
}
export default config
