import { createContext, useContext } from 'react';
import { useApi } from './useApi';

interface House {
  name: string;
  email: string;
  address: string;
  code: string;
  owner: string;
  dataLoading: boolean;
}

const HouseContext = createContext<Partial<House>>({});

export const useHouse = () => useContext<Partial<House>>(HouseContext);

export const HouseContextProvider: React.FC<{}> = ({ children }) => {
  const { data: house, loading } = useApi('/api/v1/house', { method: 'get' });

  return (
    <HouseContext.Provider value={{ ...house, dataLoading: loading } ?? {}}>
      {children}
    </HouseContext.Provider>
  );
};
