import { SSRProvider, OverlayProvider } from 'react-aria';
import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';
import type { AppProps } from 'next/app';
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <SSRProvider>
      <OverlayProvider>
        <Component {...pageProps} />
        <ResizeHandler />
        <NProgress />
      </OverlayProvider>
    </SSRProvider>
  );
}
