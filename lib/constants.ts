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

export const DEFAULT_PROFILE_PIC =
  'https://storage.googleapis.com/opensea-static/opensea-profile/4.png';

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

export const INFURA_ID = '72414aceffb245f7bd17f6239ce4a5d7';
export const NETWORK_NAME = 'mainnet';

export const OPENSEA_BASE_URL = 'https://api.opensea.io/api/v1/';
export const OPENSEA_ASSETS = 'assets';
export const OPENSEA_ASSET = 'asset'; //asset_contract_address/token_id/
export const OPENSEA_EVENTS = 'events';
export const OPENSEA_CONTRACT = 'asset_contract';
export const OPENSEA_COLLECTIONS = 'collections';

export const API_URL = 'https://graphql.datocms.com/';
export const API_TOKEN_READ = '6e37e962aaf5d60e9e1b3ce1dac08d';
export const API_TOKEN_FULL = '9a86934493e273cb21af51fb40aa2f';
export const API_TOKEN = process.env.DATOCMS_FULL_API_TOKEN;

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

export const DEFAULT_INDEX = {
  assets: [
    {
      name: 'Victor Apesalot',
      image: { url: 'https://www.datocms-assets.com/49202/1623328125-boredape.png' },
      title: 'CEO',
      company: 'Hundred Monkey Club llc',
      bio: "Just a small town ape, living in a lonely ape world. Let's share a banana!",
      twitter: 'https://twitter.com/metastash',
      github: 'https://github.com/CorradoRossi/',
      talk: { title: 'Motivational Speaker', description: 'Ape in a place doing a thing' }
    }
  ]
};

export const CONTRACTS = {
  ZORA: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
  RARIBLE_V2: '0x60f80121c31a0d46b5279700f9df786054aa5ee5',
  RARIBLE_1155: '0xd07dc4262bcdbf85190c01c996b4c06a461d2430',
  KNOWNORIGIN: '0xfbeef911dc5821886e1dda71586d90ed28174b7d',
  FOUNDATION: '0x3b3ee1931dc30c1957379fac9aba94d1c48a5405',
  SUPERRARE_V1: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
  SUPERRARE_V2: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
  ASYNCART_V1: '0x6c424c25e9f1fff9642cb5b7750b0db7312c29ad',
  ASYNCART_V2: '0xb6dae651468e9593e4581705a09c10a76ac1e0c8',
  CRYPTOARTAI: '0x3ad503084f1bd8d15a7f5ebe7a038c064e1e3fa1',
  PORTIONIO: '0xda98f59e1edecb2545d7b07b794e704ed6cf1f7a',
  PORTIONIO_1155: '0x0adf0bc748296bcba9f394d783a5f5e9406d6874',
  MINTABLE: '0x8c5acf6dbd24c66e6fd44d4a4c3d7a2d955aaad2', // Gasless store
  EPHIMERA: '0xfe21b0a8df3308c61cb13df57ae5962c567a668a'
};

export const ACTIVITY_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  SELL: 'sell',
  BUY: 'buy',
  CREATE: 'create',
  FOLLOW: 'follow',
  SEND: 'send',
  RECEIVE: 'receive'
};
