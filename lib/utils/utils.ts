import { CONTRACTS } from '@lib/constants';

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export const truncateWithEllipses = (text: string, max: number) => {
  if (!text) return null;
  return text.substr(0, max - 1) + (text.length >= max ? '...' : '');
};

export const formatAddressShort = (address: string) => {
  if (!address) {
    return null;
  }
  const startString = address.slice(0, 4);
  const endString = address.slice(address.length - 4, address.length);
  return `${startString}…${endString}`;
};

export const copyToClipBoard = async (textToCopy: any) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error(err);
  }
};

export const getBidLink = (item: any) => {
  switch (item.contract_address) {
    case CONTRACTS.ZORA:
      return `https://zora.co/${item.creator_address}/${item.token_id}`;
    case CONTRACTS.RARIBLE_V2:
    case CONTRACTS.RARIBLE_1155:
      return `https://rarible.com/token/${item.contract_address}:${item.token_id}`;
    case CONTRACTS.KNOWNORIGIN:
      if (item.token_ko_edition) {
        return `https://knownorigin.io/gallery/${item.token_ko_edition}`;
      } else {
        return `https://opensea.io/assets/${item.contract_address}/${item.token_id}?ref=0xe3fac288a27fbdf947c234f39d6e45fb12807192`;
      }
    case CONTRACTS.PORTIONIO:
    case CONTRACTS.PORTIONIO_1155:
      if (item.token_img_original_url) {
        return `https://app.portion.io/#exchange?ID=${item.token_img_original_url.replace(
          'https://ipfs.io/ipfs/',
          ''
        )}`;
      } else {
        return `https://opensea.io/assets/${item.contract_address}/${item.token_id}?ref=0xe3fac288a27fbdf947c234f39d6e45fb12807192`;
      }
    case CONTRACTS.FOUNDATION:
      return `https://foundation.app/creator/nft-${item.token_id}`;
    case CONTRACTS.SUPERRARE_V1:
      return `https://superrare.co/artwork/${item.token_id}`;
    case CONTRACTS.SUPERRARE_V2:
      return `https://superrare.co/artwork-v2/${item.token_id}`;
    case CONTRACTS.ASYNCART_V1:
      return `https://async.art/art/master/0x6c424c25e9f1fff9642cb5b7750b0db7312c29ad-${item.token_id}`;
    case CONTRACTS.ASYNCART_V2:
      return `https://async.art/art/master/0xb6dae651468e9593e4581705a09c10a76ac1e0c8-${item.token_id}`;
    case CONTRACTS.CRYPTOARTAI:
      if (item.token_edition_identifier) {
        return `https://cryptoart.ai/gallery/detail?id=${item.token_edition_identifier}`;
      } else {
        return `https://opensea.io/assets/${item.contract_address}/${item.token_id}?ref=0xe3fac288a27fbdf947c234f39d6e45fb12807192`;
      }
    case CONTRACTS.MINTABLE:
      if (item.token_listing_identifier) {
        return `https://mintable.app/t/item/t/${item.token_listing_identifier}`;
      } else {
        return `https://opensea.io/assets/${item.contract_address}/${item.token_id}?ref=0xe3fac288a27fbdf947c234f39d6e45fb12807192`;
      }
    case CONTRACTS.EPHIMERA:
      return `https://ephimera.com/tokens/${item.token_id}`;
    default:
      return `https://opensea.io/assets/${item.contract_address}/${item.token_id}?ref=0xe3fac288a27fbdf947c234f39d6e45fb12807192`;
  }
};

export const getContractName = (item: any) => {
  switch (item.contract_address) {
    case CONTRACTS.ZORA:
      return 'Zora';
    case CONTRACTS.RARIBLE_V2:
    case CONTRACTS.RARIBLE_1155:
      return 'Rarible';
    case CONTRACTS.KNOWNORIGIN:
      if (item.token_ko_edition) {
        return 'KnownOrigin';
      } else {
        return 'OpenSea';
      }
    case CONTRACTS.FOUNDATION:
      return 'Foundation';
    case CONTRACTS.SUPERRARE_V1:
    case CONTRACTS.SUPERRARE_V2:
      return 'SuperRare';
    case CONTRACTS.ASYNCART_V1:
    case CONTRACTS.ASYNCART_V2:
      return 'Async Art';
    case CONTRACTS.PORTIONIO:
    case CONTRACTS.PORTIONIO_1155:
      if (item.token_img_original_url) {
        return 'Portion.io';
      } else {
        return 'OpenSea';
      }
    case CONTRACTS.CRYPTOARTAI:
      if (item.token_edition_identifier) {
        return 'CryptoArt.Ai';
      } else {
        return 'OpenSea';
      }
    case CONTRACTS.MINTABLE:
      if (item.token_listing_identifier) {
        return 'Mintable';
      } else {
        return 'OpenSea';
      }
    case CONTRACTS.EPHIMERA:
      return 'Ephimera';
    default:
      return 'OpenSea';
  }
};

export const filterNewRecs = (newRecs: any[], oldRecs: any[], alreadyFollowed: any[]) => {
  let filteredData: any[] = [];
  newRecs.forEach(newRec => {
    if (
      !oldRecs.find(oldRec => oldRec.profile_id === newRec.profile_id) &&
      !alreadyFollowed.find(followed => followed.profile_id === newRec.profile_id)
    ) {
      filteredData.push(newRec);
    }
  });
  return filteredData;
};
