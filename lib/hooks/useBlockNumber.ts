import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';

const getBlockNumber = (library: any) => {
  return async () => {
    return library.getBlockNumber();
  };
};

const useBlockNumber = () => {
  const { library } = useWeb3React();
  const shouldFetch = !!library;

  return useSWR(shouldFetch ? ['BlockNumber'] : null, getBlockNumber(library), {
    refreshInterval: 10 * 1000
  });
};

export default useBlockNumber;
