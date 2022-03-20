import { createContext, useContext, useState } from 'react';
import { useApi } from './useApi';

interface TasksContext {
  tasks?: Tasks;
  refetchCurrentTasks: (value: Tasks) => void;
}
interface Tasks {
  tasks?: {
    name: string;
    description: string;
    isComplete: boolean;
    dueDate: string;
    interval: number;
    assigned: string;
    pool: string[];
  }[];
}

const initialValue: Tasks = {
  tasks: [
    {
      name: '',
      description: '',
      isComplete: false,
      dueDate: new Date().toUTCString(),
      interval: 0,
      assigned: '',
      pool: [],
    },
  ],
};
const TasksContext = createContext<TasksContext>({
  tasks: undefined,
  refetchCurrentTasks: () => null,
});

export const useTask = () => useContext<TasksContext>(TasksContext);

export const TasksContextProvider: React.FC<{}> = ({ children }) => {
  const [currentTasks, setCurrentTasks] = useState<Tasks>(initialValue);
  const { data: tasks } = useApi('/api/v1/house/tasks', { method: 'get' });
  console.log(tasks);
  setCurrentTasks(tasks?.tasks as Tasks);

  const refetchCurrentTasks = () => {
    const { data: tasks } = useApi('/api/v1/house/tasks', { method: 'get' });
    setCurrentTasks(tasks?.tasks as Tasks);
  };

  return (
    <TasksContext.Provider value={{ ...tasks?.tasks, refetchCurrentTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
