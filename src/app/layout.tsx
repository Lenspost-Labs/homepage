import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"

import './globals.css'
import Header from '@/components/header'
import { usePathname } from 'next/navigation'
import { Providers } from './providers'
import { Toaster } from "@/ui/toaster"
import {config} from '@/configs/config'
import { APP_TWITTER_ID } from '@/lib/Constants'

const sfPro = localFont({
	src: [
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Semibold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Black.ttf',
			weight: '800',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-sfpro',
})

export const metadata: Metadata = {
	title: {
		default:"Poster",
		template: "@%s | Poster",
	},
	icons:["/favicon.ico"],
	description: 'Poster from Lenspost',
	metadataBase: new URL(config?.APP_URL),
	keywords:["poster", "lenspost", "nft", "art"],
	creator: "Lenspost",
	applicationName: "Poster",
	openGraph: {
		title: "Poster",
		description: "Poster from Lenspost",
		images: [`${config?.APP_URL}/logo_poster.jpg`],
		url: config?.APP_URL,
	  },
	  twitter: {
		card: "summary",
		creator: APP_TWITTER_ID,
		title: "Frames Lenspost",
		description: "Share farcater frames from Lenspost",
		images: [`${config?.APP_URL}/logo_poster.jpg`],
		site: APP_TWITTER_ID,
	  },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={sfPro.variable} suppressHydrationWarning>
				<div className="flex flex-col min-h-screen">
					<Providers>
						<Header />
							<Toaster />
						<main className="flex-grow">{children}</main>
						<Analytics />
					</Providers>
				</div>
			</body>
		</html>
	)
}
