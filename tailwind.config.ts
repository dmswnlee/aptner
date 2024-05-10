import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				theme: "#174d50",
				charcoal: "#4c5d71",
				border: "#eaeaea",
				placeholder: "#fcfcfc",
				blue_05: "#00A8FF",
				blue_300: "#05A8FF",
				blue_500: "#0086CC",
				gray_00: "#FCFCFC",
				gray_04: "#EAEAEA",
				gray_05: "#DDDDDD",
				gray_06: "#BBBBBB",
				gray_07: "#999999",
				gray_200: "#cccccc",
				gray_300: "#C8C8C8",
				gray_400: "#858E96",
				gray_600: "#777777",
				gray_800: "#333333",
			},
		},
	},
	plugins: [],
};

export default config;
