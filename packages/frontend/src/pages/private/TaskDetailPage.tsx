import {
  ArrowNarrowLeftIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Button, Text } from '@nextui-org/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { convertCompilerOptionsFromJson } from 'typescript';
import Page from '../../components/common/layout/Page';
import DeleteButton from '../../components/task/task/DeleteButton';
import cleaning from '../../res/dashboard/cleaning.webp';

interface TaskDetailPageProps {}

const TaskPage: React.FC<TaskDetailPageProps> = () => {
  const { id } = useParams() as { id: string };
  const taskId = parseInt(id);

  const setNavigate = useNavigate();

  const taskName = 'Do the dishes';
  const taskDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget nulla et enim laoreet vulputate. Cras dapibus lectus sit amet erat suscipit, in dapibus leo suscipit. Cras facilisis consequat efficitur. Morbi a magna arcu. Duis molestie, tellus quis finibus vulputate, ex augue ultricies arcu, a congue nunc felis ut elit. Cras luctus euismod volutpat. Quisque turpis eros, convallis nec vehicula sed, ornare ac erat. Nulla ultrices mauris eget mauris venenatis dapibus vitae eu urna.';
  const assignees = ['John', 'Linda'];

  return (
    <Page>
      <div className="flex flex-col h-max">
        <div
          className="mb-8"
          onClick={() => {
            setNavigate('/tasks');
          }}
        >
          <ArrowNarrowLeftIcon className="h-5 inline" />
          <p className="inline align-middle">Tasks</p>
        </div>

        <div className="grow grid grid-flow-col grid-cols-2">
          <div>
            <img
              draggable={false}
              className="object-cover rounded-lg h-full"
              src={cleaning}
              alt=""
            />
          </div>

          <div className="flex flex-col mx-8">
            <PencilAltIcon className="h-5 w-5 self-end" />
            <h1 className="font-bold text-2xl self-center mb-2">{taskName}</h1>

            <div className="mb-10">
              Assigned to:{' '}
              {<p className="font-bold inline">{assignees.toString()}</p>}
            </div>
            <div className="flex-grow mb-10">{taskDescription}</div>
            <DeleteButton onClick={() => console.log('delete pressed')} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TaskPage;
