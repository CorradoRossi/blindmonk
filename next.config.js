/*
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  images: {
    domains: [
      'www.datocms-assets.com',
      'localhost' // For Strapi
    ],
    imageSizes: [24, 64, 300]
  }
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  silent: true
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
*/

module.exports = {
  images: {
    domains: ['www.datocms-assets.com', 'api.opensea.io', 'lh3.googleusercontent.com'],
    imageSizes: [24, 64, 300]
  },
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/72414aceffb245f7bd17f6239ce4a5d7',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/72414aceffb245f7bd17f6239ce4a5d7',
    FORTMATIC_API_KEY: 'pk_test_A6260FCBAA2EBDFB',
    MAGIC_API_KEY: 'pk_test_398B82F5F0E88874',
    PORTIS_DAPP_ID: 'e9be171c-2b7f-4ff0-8db9-327707511ee2',
    DATOCMS_READ_ONLY_API_TOKEN: '6e37e962aaf5d60e9e1b3ce1dac08d',
    DATOCMS_FULL_API_TOKEN: '9a86934493e273cb21af51fb40aa2f',
    NEXT_PUBLIC_PRIVACY_POLICY_URL: 'https://metastash.xyz',
    NEXT_PUBLIC_COPYRIGHT_HOLDER: 'https://metastash.xyz',
    SENTRY_DSN: 'https://6296b94f1426454f82a492d2a56b82dd@o804754.ingest.sentry.io/5803099',
    NEXT_PUBLIC_SENTRY_DSN:
      'https://6296b94f1426454f82a492d2a56b82dd@o804754.ingest.sentry.io/5803099'
  }
};
