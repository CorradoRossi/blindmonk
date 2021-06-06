import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}...${hex.substring(
    hex.length - length
  )}`;
}

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {string | null} data
 */
export function formatEtherscanLink(type, data) {
  if (!data) return "";
  switch (type) {
    case "Account": {
      return `https://etherscan.io/address/${data}`;
    }
    case "Transaction": {
      return `https://etherscan.io/tx/${data}`;
    }
    default: {
      return `https://etherscan.io/address/${data}`;
    }
  }
}

export function getETHBalance(library, address) {
  return library.getBalance(address).then((balance) => parseBalance(balance));
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
  Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);
