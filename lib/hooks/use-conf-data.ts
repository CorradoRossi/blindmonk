import { createContext, useContext } from 'react';
import { ConfDataContextType } from '@lib/types';

export const ConfDataContext = createContext<ConfDataContextType | null>(null);

export default function useConfData() {
  const result = useContext(ConfDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
