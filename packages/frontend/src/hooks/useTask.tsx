import { createContext, useContext } from 'react';
import { useApi } from './useApi';

interface TasksRequest {
  tasks?: Task[];
  refetchTask: (optimistic?: any) => Promise<any>;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  isComplete: boolean;
  dueDate: string;
  interval: number;
  assigned: string;
  pool: string[];
}

const initialValue: Task[] = [];
const TasksContext = createContext<TasksRequest>({
  tasks: initialValue,
  refetchTask: async () => {},
});

export const useTask = () => useContext<TasksRequest>(TasksContext);

export const TasksContextProvider: React.FC<{}> = ({ children }) => {
  const { data: res, mutate } = useApi('/api/v1/house/tasks', {
    method: 'get',
  });
  const tasks = res?.tasks?.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate),
  );

  return (
    <TasksContext.Provider value={{ tasks: tasks ?? [], refetchTask: mutate }}>
      {children}
    </TasksContext.Provider>
  );
};
