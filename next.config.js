/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SENDINBLUE_API_KEY: process.env.SENDINBLUE_API_KEY || "",
	},
	reactStrictMode: true,
	output: "export",
};

module.exports = nextConfig;
