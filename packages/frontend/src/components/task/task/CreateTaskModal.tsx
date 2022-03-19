import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Textarea,
  Switch,
  Text,
} from '@nextui-org/react';
import { CheckIcon } from '@heroicons/react/outline';
import AssigneeSelectionList from './AssigneeSelectionList';
import { useApi, useApiMutation } from '../../../hooks/useApi';
import ErrorModal from './ErrorModal';

interface CreateTaskModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

interface CreatTaskState {
  name: string;
  description: string;
  isComplete: boolean;
  dueDate: string;
  interval?: number | undefined;
  pool: string[];
}

const initialValue: CreatTaskState = {
  name: '',
  description: '',
  isComplete: false,
  dueDate: new Date().toUTCString(),
  interval: 0,
  pool: [],
};

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  setVisible,
}) => {
  const [newTask, setNewTask] = useState(initialValue);
  const [checkBoxValues, setCheckBoxValues] = useState<string[]>([]);
  const [visibleErrorModal, setVisibleErrorModal] = React.useState(false);

  const createTask = useApiMutation('/api/v1/house/tasks', { method: 'post' });

  const closeHandler = () => {
    setVisible(false);
    setNewTask(initialValue);
    setCheckBoxValues([]);
  };

  const submitHandler = async () => {
    newTask.pool = checkBoxValues;
    const result = await createTask({
      body: {
        ...newTask,
      },
    });
    result.name === newTask.name
      ? setVisible(false)
      : setVisibleErrorModal(true);
  };

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <div className="scrollbar-hide">
          <Modal.Header>
            <p>Creating Task</p>
          </Modal.Header>
          <Modal.Body>
            <Input
              aria-label="Task Name"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="Task name"
              placeholder="Enter the task name"
              className="focus:border-teal-500"
              onChange={(event) => {
                newTask.name = event.target.value;
                setNewTask(newTask);
              }}
            />
            <Textarea
              aria-label="Task Description"
              bordered
              size="lg"
              color="primary"
              label="Description"
              placeholder="Enter the task description."
              onChange={(event) => {
                newTask.description = event.target.value;
                setNewTask(newTask);
              }}
            />
            <Input
              aria-label="Task Due Date"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="Task Due Date"
              className="focus:border-teal-500"
              type="date"
              onChange={(event) => {
                const timeStamp = Date.parse(event.target.value);
                const newDueDate = new Date(timeStamp).toUTCString();
                newTask.dueDate = newDueDate;
                setNewTask(newTask);
              }}
            />
            <Input
              aria-label="Task Interval"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              label="Task Interval"
              className="focus:border-teal-500"
              type="number"
              placeholder="Enter a number"
              onChange={(event) => {
                const intervalValue = parseInt(event.target.value);
                newTask.interval = intervalValue;
                setNewTask(newTask);
              }}
            />
            <div>
              <Text className="pl-1 mb-1.5 text-teal-400">Complete</Text>
              <Switch
                initialChecked={false}
                color="success"
                size="xl"
                icon={<CheckIcon />}
                onChange={(event) => {
                  newTask.isComplete = event.target.checked;
                  setNewTask(newTask);
                }}
              />
            </div>
            <AssigneeSelectionList
              peopleInHouse={people}
              checkBoxValues={checkBoxValues}
              setCheckBoxValues={setCheckBoxValues}
            />
          </Modal.Body>
          <Modal.Footer className="justify-center">
            <Button auto color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button auto onClick={submitHandler}>
              Submit
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <ErrorModal
        visibleErrorModal={visibleErrorModal}
        setVisibleErrorModal={setVisibleErrorModal}
        errorMessage="Cannot create the task."
      />
    </div>
  );
};

export default CreateTaskModal;
