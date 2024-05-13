import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        'theme-light-purple-50': '#FCFFE7',
        'theme-light-purple': '#CAC2FF',
        'theme-border-gray': '##F2F2F1',
        'theme-purple': '#B071EC',
        'theme-gray': '#C3B9C0'
      },
      boxShadow: {
        'purple-500': '0 0 25px rgba(128, 0, 128, 0.7)'
      },
      rotate: {
        '15': '15deg'
      }
    }
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: []
};
export default config;
