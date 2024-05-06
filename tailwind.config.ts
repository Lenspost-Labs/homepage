import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['var(--font-sfpro)']
      // },
      rotate: {
        '15': '15deg'
      },
      boxShadow: {
        'purple-500': '0 0 25px rgba(128, 0, 128, 0.7)'
      },
      colors: {
        'theme-light-purple': '#CAC2FF',
        'theme-light-purple-50': '#FCFFE7',
        'theme-purple': '#B071EC',
        'theme-gray': '#C3B9C0',
        'theme-border-gray': '##F2F2F1'
      }
    }
  },
  plugins: []
};
export default config;
