import { formatUnits } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';

const shortenHex = (hex: any, length: any = 4) => {
  return `${hex.substring(0, length + 2)}...${hex.substring(hex.length - length)}`;
};

// type: Account | Transaction
const formatEtherscanLink = (type: any, data: string) => {
  if (!data) return '';
  switch (type) {
    case 'Account': {
      return `https://etherscan.io/address/${data}`;
    }
    case 'Transaction': {
      return `https://etherscan.io/tx/${data}`;
    }
    default: {
      return `https://etherscan.io/address/${data}`;
    }
  }
};

const getETHBalance = (library: any, address: string) => {
  return library.getBalance(address).then((balance: any) => parseBalance(balance));
};

const parseBalance = (
  balance: BigNumberish,
  decimals: number = 18,
  decimalsToDisplay: number = 3
) => Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);

export { shortenHex, formatEtherscanLink, getETHBalance, parseBalance };
