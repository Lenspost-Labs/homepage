'use client';

import {
  optimism,
  arbitrum,
  mainnet,
  polygon,
  degen,
  base
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WALLETCONNECT_KEY, PRIVY_APP_ID } from '@/data';
import { WagmiProvider } from '@privy-io/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

export const privyConfig: PrivyClientConfig = {
  appearance: {
    walletList: ['coinbase_wallet', 'detected_wallets', 'wallet_connect'],
    loginMessage: 'Login to Poster.fun',
    showWalletLoginFirst: true
  },
  externalWallets: {
    coinbaseWallet: {
      connectionOptions: 'all'
    }
  },
  loginMethods: ['wallet']
};

const config = getDefaultConfig({
  chains: [base, mainnet, polygon, optimism, arbitrum, degen],
  projectId: WALLETCONNECT_KEY,
  appName: 'Lenspost Studio',
  ssr: true
});

const queryClient = new QueryClient();

const EvmProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default EvmProvider;
