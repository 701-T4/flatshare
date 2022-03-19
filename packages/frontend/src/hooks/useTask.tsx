import { createContext, useContext } from 'react';
import { useApi } from './useApi';

const TaskContext = createContext<unknown>([]);

export const useTask = () => useContext<unknown>(TaskContext);

export const TaskProvider: React.FC<{}> = ({ children }) => {
  const { data: tasks } = useApi('/api/v1/house/tasks', { method: 'get' });

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
};
