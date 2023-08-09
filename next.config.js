/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
			}
		],
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
