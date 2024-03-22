"use client";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient, 
} from "@tanstack/react-query";


const config = getDefaultConfig({
  appName: 'Gallery',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true, 
});


const queryClient = new QueryClient();

export const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
