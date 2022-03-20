// import { getAuth } from 'firebase/auth';
import React from 'react';
import Page from '../../components/common/layout/Page';
import CreateNewTaskButton from '../../components/task/task/CreateNewTaskButton';
import CreateTaskModal from '../../components/task/task/CreateTaskModal';
import { useTask } from '../../hooks/useTask';

interface TaskPageProps {}

const TaskPage: React.FC<TaskPageProps> = () => {
  // const setNavigate = useNavigate();
  // const auth = getAuth();
  const { tasks } = useTask();

  // console.log(auth.currentUser?.displayName);
  console.log(tasks);

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
      <div className="flex flex-col gap-8"></div>
      <CreateTaskModal
        visible={visibleCreateModal}
        setVisible={setVisibleCreateModal}
      />
    </Page>
  );
};

export default TaskPage;
