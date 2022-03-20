import { createContext, useContext } from 'react';
import { useApi } from './useApi';

interface TasksContext {
  tasks?: Task[];
}

export interface Task {
  name: string;
  description: string;
  isComplete: boolean;
  dueDate: string;
  interval: number;
  assigned: string;
  pool: string[];
}

const initialValue: Task[] = [];
// eslint-disable-next-line @typescript-eslint/no-redeclare
const TasksContext = createContext<TasksContext>({
  tasks: initialValue,
});

export const useTask = () => useContext<TasksContext>(TasksContext);

export const TasksContextProvider: React.FC<{}> = ({ children }) => {
  const { data: res } = useApi('/api/v1/house/tasks', { method: 'get' });
  const tasks = res?.tasks?.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate),
  );

  return (
    <TasksContext.Provider value={{ tasks: tasks ?? [] }}>
      {children}
    </TasksContext.Provider>
  );
};
