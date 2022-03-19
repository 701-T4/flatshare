import { createContext, useContext } from 'react';
import { useApi } from './useApi';

const TaskProvider = createContext<any>({});

export const useTask = () => useContext<any>(TaskProvider);

export const TaskProviderProvider: React.FC<{}> = ({ children }) => {
  const tem = useApi('/api/v1/house/tasks', { method: 'get' });

  return (
    <TaskProvider.Provider value={tem ?? {}}>{children}</TaskProvider.Provider>
  );
};
