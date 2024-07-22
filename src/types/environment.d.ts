// type declaration of environmet variables
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_WALLETCONNECT_KEY: string;
    NEXT_PUBLIC_PRIVY_APP_ID: string;
  }
}
