export const SITE_URL = 'https://blindmonk.club';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'metastash';
export const TITLE = 'Blindmonk';
export const SITE_NAME = 'Blindmonk';
export const BRAND_NAME = 'Blindmonk';
export const META_DESCRIPTION = 'Blindmonk';
export const SITE_DESCRIPTION = 'Blindmonk';
export const TWEET_TEXT = 'Welcome to Metastash';
export const SITE_NAME_MULTILINE = ['Blind', 'Monk'];
export const COOKIE = 'user-id';
export const DEFAULT_ERROR_MSG = 'Error! Please try again.';

// Number of seconds to cache the API response for
export const EXPIRES_SECONDS = 5;
export const SAMPLE_TICKET_NUMBER = 1234;
export const RSSI_WALLET = '0x90c19feA1eF7BEBA9274217431F148094795B074';
export const CODE_OF_CONDUCT = 'https://metastash.xyz';
export const REPO = 'https://github.com/CorradoRossi/blindmonk';

export const META = {
  title: TITLE,
  description: META_DESCRIPTION
};

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const INFURA_ID = 'INVALID_INFURA_KEY'; //https://infura.io/register
export const NETWORK_NAME = 'mainnet';

export const OPENSEA_BASE_URL = 'https://api.opensea.io/api/v1/';
export const OPENSEA_ASSETS = 'assets';
export const OPENSEA_ASSET = 'asset'; //asset_contract_address/token_id/
export const OPENSEA_EVENTS = 'events';
export const OPENSEA_CONTRACT = 'asset_contract';
export const OPENSEA_COLLECTIONS = 'collections';

export const API_URL = 'https://graphql.datocms.com/';
export const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

export const NAVIGATION = [
  {
    name: 'Profile',
    route: '/platform/one'
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
