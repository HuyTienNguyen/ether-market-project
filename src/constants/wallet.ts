export enum Wallet {
  METAMASK = 1,
  BINANCE = 2,
}

const METAMASK_ICON_URL = "/images/MetaMask_Fox.svg.png";
const BINANCE_ICON_URL = "/images/Binance_Logo.png";

type WalletInfo = {
  connector?: any;
  id: number;
  name: string;
  iconURL: string;
  description: string;
};

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    // connector: injected,
    id: Wallet.METAMASK,
    name: "MetaMask",
    iconURL: METAMASK_ICON_URL,
    description: "Easy-to-use browser extention.",
  },
  WALLET_CONNECT: {
    // connector: walletconnect,
    id:Wallet.BINANCE,
    name: "Binance",
    iconURL: BINANCE_ICON_URL,
    description: "Connect to Binance Wallet.",
  },
};
