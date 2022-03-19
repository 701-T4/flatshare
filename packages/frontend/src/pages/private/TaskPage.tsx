import React from 'react';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useHouse } from '../../hooks/useHouse';
import { useNavigate } from 'react-router';
import CreateNewTaskButton from '../../components/task/task/CreateNewTaskButton';
import CreateTaskModal from '../../components/task/task/CreateTaskModal';

interface TaskPageProps {}

const TaskPage: React.FC<TaskPageProps> = () => {
  const setNavigate = useNavigate();
  const { name } = useHouse();
  const mockTaskData = [
    {
      type: `Incomplete assigned to ${name}`,
      getMockTask: () =>
        [...Array(4)].map((_, i) => (
          <UpcomingTask
            title="Take out the Rubbish"
            dueString="Due Tomorrow"
            twColor={UpcomingTask.Variation.red}
            type="Task"
            onCompleteClick={() => setNavigate('/tasks/1')}
          />
        )),
    },
    {
      type: 'Other incomplete tasks',
      getMockTask: () =>
        [...Array(2)].map((_, i) => (
          <UpcomingTask
            title="Take out the Rubbish"
            dueString="Due Tomorrow"
            twColor={UpcomingTask.Variation.purple}
            type="Task"
            onCompleteClick={() => setNavigate('/tasks/1')}
          />
        )),
    },
    {
      type: `Complete tasks assigned to ${name}`,
      getMockTask: () =>
        [...Array(2)].map((_, i) => (
          <UpcomingTask
            title="Take out the Rubbish"
            dueString="Due Tomorrow"
            twColor={UpcomingTask.Variation.amber}
            type="Task"
            completed
            onCompleteClick={() => setNavigate('/tasks/1')}
          />
        )),
    },
    {
      type: 'Other complete tasks',
      getMockTask: () =>
        [...Array(3)].map((_, i) => (
          <UpcomingTask
            title="Take out the Rubbish"
            dueString="Due Tomorrow"
            twColor={UpcomingTask.Variation.teal}
            type="Task"
            completed
            onCompleteClick={() => setNavigate('/tasks/1')}
          />
        )),
    },
  ];

  const [visible, setVisible] = React.useState(false);
  // Hook for the Join Button Modal to be configured
  const openModalHandler = () => {
    console.log('open create modal clicked');
    setVisible(true);
  };

  return (
    <Page>
      <div className="flex flex-row justify-end">
        <CreateNewTaskButton onClick={openModalHandler} />
      </div>
      <div className="flex flex-col gap-8">
        {mockTaskData.map((item) => (
          <div>
            <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500">
              <div className="text-lg font-semibold">{item.type}</div>
            </UnderlinedText>
            <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-2">
              {item.getMockTask()}
            </div>
          </div>
        ))}
      </div>
      <CreateTaskModal visible={visible} setVisible={setVisible} />
    </Page>
  );
};

export default TaskPage;
