import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import Header from '@/components/header'
import { usePathname } from 'next/navigation'
import { Providers } from './providers'

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
	title: 'Create Next App',
	description: 'Generated by create next app',
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
						<main className="flex-grow">{children}</main>
					</Providers>
				</div>
			</body>
		</html>
	)
}
