import { createContext, useContext } from 'react';
import { HomeDataContextType } from '@lib/types';

export const HomeDataContext = createContext<HomeDataContextType | null>(null);

const useHomeData = () => {
  const result = useContext(HomeDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
};

export default useHomeData;
