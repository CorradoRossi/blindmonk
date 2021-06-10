import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;

export const walletConnect = new WalletConnectConnector({
  rpc: { 1: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET as string },
  bridge: 'https://uniswap.bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletLink = new WalletLinkConnector({
  url: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET as string,
  appName: 'blindmonk'
});

export const injected = new InjectedConnector({
  supportedChainIds: process.env.NODE_ENV === 'development' ? [1, 3, 1337] : [1]
});
