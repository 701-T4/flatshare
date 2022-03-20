import { getAuth } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import NoUpcomingTasks from '../../components/dashboard/upcoming-tasks/NoUpcomingTasks';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import CreateNewTaskButton from '../../components/task/task/CreateNewTaskButton';
import CreateTaskModal from '../../components/task/task/CreateTaskModal';
import { useApi, useApiMutation } from '../../hooks/useApi';

interface TaskPageProps {}

interface Task {
  id: string;
  name: string;
  description: string;
  isComplete: boolean;
  dueDate: string;
  interval: number;
  assigned: string;
  pool: string[];
}

const TaskPage: React.FC<TaskPageProps> = () => {
  const setNavigate = useNavigate();
  const auth = getAuth();
  const { data: res, mutate } = useApi('/api/v1/house/tasks', {
    method: 'get',
  });
  const tasks = res?.tasks;
  const name = auth.currentUser?.displayName ?? 'user';

  const completeTask = useApiMutation('/api/v1/house/tasks/{id}/completed', {
    method: 'put',
  });

  const TaskData = [
    {
      type: `Incomplete assigned to ${name}`,
      color: UpcomingTask.Variation.red,
      tasks: [] as Task[],
    },
    {
      type: 'Other incomplete tasks',
      color: UpcomingTask.Variation.purple,
      tasks: [] as Task[],
    },
    {
      type: `Complete tasks assigned to ${name}`,
      color: UpcomingTask.Variation.amber,
      tasks: [] as Task[],
    },
    {
      type: 'Other complete tasks',
      color: UpcomingTask.Variation.teal,
      tasks: [] as Task[],
    },
  ];

  tasks?.forEach((task) => {
    let taskList;
    if (task.assigned.includes(name)) {
      taskList = task.isComplete ? TaskData[2].tasks : TaskData[0].tasks;
    } else {
      taskList = task.isComplete ? TaskData[3].tasks : TaskData[1].tasks;
    }
    taskList.push(task);
  });

  const getTaskCard = (task: Task, color: string, key: string) => (
    <div
      key={key}
      className="cursor-pointer"
      onClick={() => setNavigate(`/tasks/${key}`)}
    >
      <UpcomingTask
        title={task.name}
        dueString={task.dueDate}
        twColor={color}
        type="Task"
        completed={task.isComplete}
        onCompleteClick={async () => {
          // todo bug here
          await completeTask({
            pathParams: { id: task.id },
            body: {
              isComplete: true,
            },
          });
          console.log('start mutate');
          await mutate();
          console.log('run mutate');
        }}
      />
    </div>
  );

  const [visibleCreateModal, setVisibleCreateModal] = React.useState(false);

  // Hook for the Join Button Modal to be configured
  const openModalHandler = () => {
    console.log('open create modal clicked');
    setVisibleCreateModal(true);
  };

  return (
    <Page>
      <div className="flex flex-row justify-end">
        <CreateNewTaskButton onClick={openModalHandler} />
      </div>
      <div className="flex flex-col gap-8">
        {TaskData.map((item, index) => (
          <div key={index}>
            <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500">
              <div className="text-lg font-semibold">{item.type}</div>
            </UnderlinedText>
            {item.tasks.length > 0 ? (
              <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-2">
                {item.tasks.map((task) =>
                  getTaskCard(task, item.color, task.id),
                )}
              </div>
            ) : (
              <NoUpcomingTasks />
            )}
          </div>
        ))}
      </div>
      <CreateTaskModal
        visible={visibleCreateModal}
        setVisible={setVisibleCreateModal}
      />
    </Page>
  );
};

export default TaskPage;
