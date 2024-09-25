/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
      },
      aspectRatio: {
        '16/9': '1920 / 1070',
        '9/16': '1080 / 1920',
        '3/4': '3 / 3.8',
        '4/3': '4 / 3',
        '4/5': '4 / 5',
        '5/4': '5 / 4',
        '1.85': '1920 / 1038',
        '2.35': '1920 / 816',
        '2.39': '1920 / 802',
        '2.40': '1920 / 800',
      },
    },
  },
  plugins: [],
}

