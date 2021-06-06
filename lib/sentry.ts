import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import getConfig from 'next/config';

const initSentry = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    let integrations = [];
    const config = getConfig();
    const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;

    if (process.env.NEXT_IS_SERVER === 'true') {
      integrations.push(
        new RewriteFrames({
          iteratee: (frame: any) => {
            frame.filename = frame.filename.replace(distDir, 'app:///');
            frame.filename = frame.filename.replace('.next', '_next');
            return frame;
          }
        })
      );
    }

    integrations.push(new Integrations.BrowserTracing());

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0
    });
  }
};

export default initSentry;
