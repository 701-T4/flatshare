import { createContext, useContext } from 'react';
import { useApi } from './useApi';

interface House {
  name: string;
  email: string;
  address: string;
  code: string;
  owner: string;
  latestAnnouncement?: {
    author: string;
    dateCreated: string;
    description?: string;
    title?: string;
  };

  users: {
    name: string;
    house?: string;
    firebaseId: string;
  }[];
}

interface HouseRequest {
  dataLoading: boolean;
  refetchHouse: (optimistic?: any) => Promise<any>;
}

type THouseContext = Partial<House> & HouseRequest;

const HouseContext = createContext<THouseContext>({
  dataLoading: false,
  refetchHouse: async () => {},
});

export const useHouse = () => useContext<THouseContext>(HouseContext);

export const HouseContextProvider: React.FC<{}> = ({ children }) => {
  const {
    data: house,
    loading,
    mutate,
  } = useApi('/api/v1/house', { method: 'get' });

  return (
    <HouseContext.Provider
      value={{ ...house, dataLoading: loading, refetchHouse: mutate } ?? {}}
    >
      {children}
    </HouseContext.Provider>
  );
};
