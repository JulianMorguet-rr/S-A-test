/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', "./node_modules/flowbite/**/*.js"],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'white': '#ffffff',
			'dsv-orange': 'rgb(251 146 60)'
		},
		boxShadow: {
			'base-shadow': '0px 4px 12px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.1)'
		}
	},
	plugins: [],
}

