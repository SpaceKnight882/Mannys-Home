import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmic: '#10031f',
        nebula: '#5d2cbf',
        starlight: '#67f0ff'
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
