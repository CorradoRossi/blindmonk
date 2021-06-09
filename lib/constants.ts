export const SITE_URL = 'https://blindmonk.club';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'metastash';
export const TITLE = 'Blindmonk';
export const SITE_NAME = 'Blindmonk';
export const BRAND_NAME = 'Blindmonk';
export const META_DESCRIPTION = 'Blindmonk';
export const SITE_DESCRIPTION = 'Blindmonk';
export const TWEET_TEXT = META_DESCRIPTION;
export const SITE_NAME_MULTILINE = ['Blind', 'Monk'];
export const DATE = 'August, 2021';
export const SHORT_DATE = 'June 4 - 9:00am PST';
export const FULL_DATE = 'June 4 9am Pacific Time (GMT-7)';
export const COOKIE = 'user-id';
export const DEFAULT_ERROR_MSG = 'Error! Please try again.';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
export const INFURA_ID = 'INVALID_INFURA_KEY';
export const NETWORK_NAME = 'mainnet';

export const META = {
  title: TITLE,
  description: META_DESCRIPTION
};

export const API_URL = 'https://graphql.datocms.com/';
export const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;
export const API_PRISMIC_REF_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/api/v2`;
export const API_PRISMIC_URL = `https://${process.env.PRISMIC_REPO_ID}.prismic.io/graphql`;
export const API_PRISMIC_TOKEN = process.env.PRISMIC_ACCESS_TOKEN || '';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const SAMPLE_TICKET_NUMBER = 1234;
export const CODE_OF_CONDUCT = 'https://metastash.xyz';
export const REPO = 'https://github.com/CorradoRossi/blindmonk';

export const NAVIGATION = [
  {
    name: 'Profile',
    route: '/stage/a'
  },
  {
    name: 'Collection',
    route: '/collection'
  },
  {
    name: 'Market',
    route: '/market'
  },
  {
    name: 'Wallet',
    route: '/wallet'
  },
  {
    name: 'Settings',
    route: '/settings'
  }
];
