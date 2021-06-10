import { useEffect } from 'react';
import { SSRProvider, OverlayProvider } from 'react-aria';
import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';
import type { AppProps } from 'next/app';
import NProgress from '@components/utils/nprogress';
import ResizeHandler from '@components/utils/resize-handler';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Web3Manager from '@components/web3/web3manager';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <SSRProvider>
      <OverlayProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3Manager>
            <Component {...pageProps} />
          </Web3Manager>
          <ResizeHandler />
          <NProgress />
        </Web3ReactProvider>
      </OverlayProvider>
    </SSRProvider>
  );
};

export default App;
