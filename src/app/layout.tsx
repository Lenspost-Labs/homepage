import type { Metadata } from 'next';

import {
  LENSPOST_TWITTER_USERNAME,
  LENSPOST_APP_URL,
  APP_DESCRIPTION,
  APP_NAME,
  APP_URL,
  AUTHOR
} from '@/data';
import { Analytics } from '@vercel/analytics/react';
import { EvmProvider } from '@/provider';
import localFont from 'next/font/local';
import { Header } from '@/components';
import { Toaster } from '@/ui';

import '../styles/globals.css';

const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Regular.ttf',
      style: 'normal',
      weight: '400'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Italic.ttf',
      style: 'italic',
      weight: '400'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Medium.ttf',
      style: 'normal',
      weight: '500'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Semibold.ttf',
      style: 'normal',
      weight: '600'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Light.ttf',
      style: 'normal',
      weight: '300'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Bold.ttf',
      style: 'normal',
      weight: '700'
    },
    {
      path: '../../public/fonts/San-Francisco-Pro/SF-Pro-Rounded-Black.ttf',
      style: 'normal',
      weight: '800'
    }
  ],
  variable: '--font-sfpro',
  display: 'swap'
});

export const metadata: Metadata = {
  twitter: {
    images: [`${APP_URL}/OG_logo_1200x630.png`],
    creator: LENSPOST_TWITTER_USERNAME,
    site: LENSPOST_TWITTER_USERNAME,
    description: APP_DESCRIPTION,
    card: 'summary',
    title: APP_NAME
  },
  openGraph: {
    images: [`${APP_URL}/OG_logo_1200x630.png`],
    description: APP_DESCRIPTION,
    title: APP_NAME,
    url: APP_URL
  },
  keywords: [
    'Lenspost Mint',
    'Lenspost NFT',
    'Lenspost',
    'Poster',
    'Mint',
    'NFT'
  ],
  authors: [{ url: LENSPOST_APP_URL, name: AUTHOR }],
  metadataBase: new URL(APP_URL),
  description: APP_DESCRIPTION,
  icons: ['/favicon.ico'],
  title: APP_NAME,
  creator: AUTHOR
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={sfPro.variable} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <EvmProvider>
            <Analytics />
            <Toaster />
            <Header />
            <main className="flex-grow">{children}</main>
          </EvmProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
