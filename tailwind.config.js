/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-grey': '#75808A',
				'primary-violet': '#805CF5',
				'secondary-violet': '#F2EEFE',
				black: '#191C1F',
			},
		},
	},
	plugins: [],
};
