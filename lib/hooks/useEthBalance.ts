import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { parseBalance } from '../utils/web3';
import useKeepSWRDataLiveAsBlocksArrive from './useKeepSwrData';

function getETHBalance(library: any) {
  return async (address: any, _: any) => {
    return library.getBalance(address).then((balance: any) => parseBalance(balance));
  };
}

export default function useETHBalance(address: any, suspense = false) {
  const { library, chainId } = useWeb3React();

  const shouldFetch = typeof address === 'string' && !!library;

  const result = useSWR(
    shouldFetch ? [address, chainId, 'ETHBalance'] : null,
    getETHBalance(library),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
