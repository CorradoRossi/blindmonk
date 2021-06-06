import * as Sentry from "@sentry/browser";

const parseError = (err) => {
  if (err instanceof Error) return err;
  const newErr = new Error(err.message || "unexpected");
  for (const [key, value] of Object.entries(err)) {
    newErr[key] = value;
  }
  return newErr;
};

export const logError = (err) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  } else {
    Sentry.captureException(parseError(err));
  }
};
