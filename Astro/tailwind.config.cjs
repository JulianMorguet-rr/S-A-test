/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', 
		'./node_modules/flowbite/**/*.js',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'white': '#ffffff',
			'dsv-orange': 'rgb(251 146 60)',
			'base-color': 'rgb(11 149 161)',
			'Secondary-color': 'rgb(77 189 198)',
			'tertiary-color': 'rgb(4, 82, 89)',
		},
		bg: {
			'base-color': 'rgb(11 149 161)',
			'secondary-color': 'rgb(77 189 198)',
			'tertiary-color': 'rgb(4, 82, 89)',
		},
		boxShadow: {
			'base-shadow': '0px 4px 12px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.1)'
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}

