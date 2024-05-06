'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism, arbitrum, mainnet, polygon, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { WALLETCONNECT_KEY } from '@/data';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  chains: [base, mainnet, polygon, optimism, arbitrum],
  projectId: WALLETCONNECT_KEY,
  appName: 'Lenspost Studio',
  ssr: true
});

const queryClient = new QueryClient();

export default function EvmProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
