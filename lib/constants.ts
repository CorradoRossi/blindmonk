export const SITE_URL = 'https://blindmonk.club';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'metastash';
export const BRAND_NAME = 'Blindmonk';
export const SITE_NAME_MULTILINE = ['Blind', 'Monk'];
export const SITE_NAME = 'Blindmonk';
export const META_DESCRIPTION = 'NFT collection and marketplace';
export const SITE_DESCRIPTION = 'NFT collection and marketplace';
export const DATE = 'August, 2021';
export const SHORT_DATE = 'June 4 - 9:00am PST';
export const FULL_DATE = 'June 4 9am Pacific Time (GMT-7)';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT = 'https://metastash.xyz';
export const REPO = 'https://github.com/CorradoRossi/blindmonk';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  {
    name: 'Profile',
    route: '/profile'
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

export type TicketGenerationState = 'default' | 'loading';
