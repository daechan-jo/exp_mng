/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'iphone-se': '375px',
        'iphone-xr': '414px',
        'iphone-12': '390px',
        'iphone-12-pro-max': '428px',
        'android-standard': '360px',
      },
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out'
			}
    },
  },
  plugins: [],
};
