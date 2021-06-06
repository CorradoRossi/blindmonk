import * as Sentry from '@sentry/browser';

const parseError = (err: any) => {
  if (err instanceof Error) return err;
  const newErr = new Error(err.message || 'unexpected');
  for (const [key, value] of Object.entries(err)) {
    // @ts-ignore
    newErr[key] = value;
  }
  return newErr;
};

export const logError = (err: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  } else {
    Sentry.captureException(parseError(err));
  }
};
