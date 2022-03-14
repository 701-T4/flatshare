import React from 'react';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import { useNavigate } from 'react-router';

interface TaskPageProps {}

const TaskPage: React.FC<TaskPageProps> = () => {
  const setNavigate = useNavigate();

  return (
    <div>
      TaskPage
      <UpcomingTask
        title="Do the Dishes"
        dueString="Due Tomorrow"
        twColor={UpcomingTask.Variation.amber}
        type="Task"
        completed
        onCompleteClick={() => setNavigate('/tasks/1')}
      />
    </div>
  );
};

export default TaskPage;
