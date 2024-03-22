/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		scrollRestoration: true,
	},
	images: {
		minimumCacheTTL: 3600,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	webpack: config => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding');
		return config;
	},
}

export default nextConfig
