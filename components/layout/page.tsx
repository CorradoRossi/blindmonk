import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_NAME, SITE_URL, TWITTER_USER_NAME } from '@lib/constants';
import { PageProps } from '@lib/types';

const Page = ({ meta, children, fullViewport = false }: PageProps) => {
  const router = useRouter();
  const image = meta.image || '/tri-circle-purple.png';
  const title = meta.title || SITE_NAME;
  const url = meta.url || `${SITE_URL}${router.asPath}`;
  const description = meta.description || SITE_NAME;

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        <link rel="apple-touch-icon" sizes="180x180" href="/tri-circle-purple.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/tri-circle-purple.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/tri-circle-purple.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/tri-circle-purple.png" />
        <link
          rel="preload"
          href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {image && (
          <meta
            property="og:image"
            content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
          />
        )}
      </Head>
      {children}
    </div>
  );
};

export default Page;
