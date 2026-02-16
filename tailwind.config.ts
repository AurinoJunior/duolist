import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FFF5ED',
          100: '#FFE8D6',
          200: '#FFCEAD',
          300: '#FFB088',
          400: '#FF8C42',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        peach: {
          50: '#FFF8F3',
          100: '#FFEEE0',
          200: '#FFD9BE',
          300: '#FFC49C',
          400: '#FFB88C',
          500: '#FFA366',
          600: '#FF8540',
          700: '#FF6B1A',
          800: '#E65100',
          900: '#BF3F00',
        },
        cream: {
          50: '#FFF8F0',
          100: '#FFF2E0',
          200: '#FFE6C2',
          300: '#FFD9A3',
          400: '#FFCD85',
          500: '#FFC166',
          600: '#FFB547',
          700: '#FFA929',
          800: '#FF9D0A',
          900: '#EB8C00',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
