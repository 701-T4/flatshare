import { PencilAltIcon } from '@heroicons/react/outline';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../components/common/layout/Page';
import DeleteButton from '../../components/task/task/DeleteButton';
import EditTaskModal from '../../components/task/task/EditTaskModal';
import ReturnButton from '../../components/task/task/ReturnButton';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useHouse } from '../../hooks/useHouse';
import cleaning from '../../res/dashboard/cleaning.webp';

interface TaskDetailPageProps {}

const TaskPage: React.FC<TaskDetailPageProps> = () => {
  const { id } = useParams() as { id: string };

  const setNavigate = useNavigate();

  const [visibleEditModal, setVisibleEditModal] = React.useState(false);

  //Enable the delete button if the house owner is the same as the user
  const house = useHouse();
  const { user } = useAuth();
  let enabled = house.owner === user?.uid;

  const { data: res } = useApi('/api/v1/house/tasks', {
    method: 'get',
  });
  const tasks = res?.tasks;
  const taskDetail = tasks?.find((task) => task.id === id);

  const deleteTask = useApiMutation('/api/v1/house/tasks/{id}', {
    method: 'delete',
  });

  const openModalHandler = () => {
    setVisibleEditModal(true);
  };

  const deleteTaskHandler = async () => {
    deleteTask({ pathParams: { id: id } });
    setNavigate('/tasks');
  };

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

          <div className="flex flex-col mx-3 my-4 md:mx-8">
            <button className="self-end" onClick={openModalHandler}>
              <PencilAltIcon className="w-5 h-5 hover:text-teal-500" />
            </button>
            <h1 className="self-center px-5 mb-2 text-2xl font-bold sm:px-0">
              {taskDetail?.name}
            </h1>
            <div className="px-5 mb-10 sm:px-0">
              <span>Assigned to: </span>
              {<p className="inline font-bold">{taskDetail?.assigned}</p>}
            </div>

            <div className="flex-grow px-5 mb-10 text-justify sm:px-0">
              {taskDetail?.description}
            </div>

            <DeleteButton
              enabled={enabled}
              onClick={() => deleteTaskHandler()}
            />
          </div>
        </div>
      </div>
      <EditTaskModal
        visible={visibleEditModal}
        setVisible={setVisibleEditModal}
        createTask={false}
        currentTaskName={taskDetail?.name as string}
        currentTaskDescription={taskDetail?.description as string}
        currentSelectedPeople={taskDetail?.pool as string[]}
        userId={id}
      />
    </Page>
  );
};

export default TaskPage;
