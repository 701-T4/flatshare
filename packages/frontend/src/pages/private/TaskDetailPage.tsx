import { PencilAltIcon } from '@heroicons/react/outline';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../components/common/layout/Page';
import DeleteButton from '../../components/task/task/DeleteButton';
import EditAndCreateTaskModal from '../../components/task/task/EditAndCreateTaskModal';
import ReturnButton from '../../components/task/task/ReturnButton';
import { useAuth } from '../../hooks/useAuth';
import { useHouse } from '../../hooks/useHouse';
import cleaning from '../../res/dashboard/cleaning.webp';

interface TaskDetailPageProps {}

const TaskPage: React.FC<TaskDetailPageProps> = () => {
  const { id } = useParams() as { id: string };
  const taskId = parseInt(id);

  const setNavigate = useNavigate();

  const taskName = 'House cleaning';
  const taskDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nulla et enim laoreet vulputate. Cras dapibus lectus sit amet erat suscipit, in dapibus leo suscipit. Cras facilisis consequat efficitur. Morbi a magna arcu. Duis molestie, tellus quis finibus vulputate, ex augue ultricies arcu, a congue nunc felis ut elit. Cras luctus euismod volutpat. Quisque turpis eros, convallis nec vehicula sed, ornare ac erat. Nulla ultrices mauris eget mauris venenatis dapibus vitae eu urna.';
  const assignee = 'John';

  const [visible, setVisible] = React.useState(false);

  // Hook for the Join Button Modal to be configured
  const openModalHandler = () => {
    console.log('open edit modal clicked');
    setVisible(true);
  };

  const house = useHouse();
  console.log(house, 'house');

  const { user } = useAuth();
  console.log(user);

  const enabled = house.owner === user?.displayName;
  console.log(enabled);

  return (
    <Page>
      <div className="flex flex-col h-max ">
        <div
          className="mb-8 "
          onClick={() => {
            setNavigate('/tasks');
          }}
        >
          <ReturnButton
            onClick={() => {
              console.log('return clicked');
            }}
          />
        </div>

        <div className="flex flex-col rounded-lg shadow-2xl grow md:grid md:grid-flow-col md:grid-cols-2">
          <div>
            <img
              draggable={false}
              className="object-cover h-full rounded-lg md:rounded-l-lg"
              src={cleaning}
              alt=""
            />
          </div>

          <div className="flex flex-col md:mx-8 mx-3 my-4">
            <button className="self-end" onClick={openModalHandler}>
              <PencilAltIcon className="w-5 h-5 hover:text-teal-500" />
            </button>
            <h1 className="font-bold text-2xl self-center mb-2 px-5 sm:px-0">
              {taskName}
            </h1>
            <div className="mb-10 px-5 sm:px-0">
              <span>Assigned to: </span>
              {<p className="inline font-bold">{assignee}</p>}
            </div>

            <div className="flex-grow text-justify mb-10 px-5 sm:px-0">
              {taskDescription}
            </div>

            <DeleteButton
              enabled={enabled}
              onClick={() => console.log('delete pressed')}
            />
          </div>
        </div>
      </div>
      <EditAndCreateTaskModal
        visible={visible}
        setVisible={setVisible}
        createTask={false}
        currentTaskName={taskName}
        currentTaskDescription={taskDescription}
        currentAssignee={assignee}
      />
    </Page>
  );
};

export default TaskPage;
