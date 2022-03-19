import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Textarea,
  Switch,
  Text,
} from '@nextui-org/react';
import AssigneeCombobox from './AssigneeCombobox';
import { CheckIcon } from '@heroicons/react/outline';

interface CreateTaskModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

interface CreatTaskState {
  name: string;
  description: string;
  isComplete: boolean;
  dueDate: Date;
  interval: number;
  pool: string[];
}

const initialValue: CreatTaskState = {
  name: '',
  description: '',
  isComplete: false,
  dueDate: new Date(),
  interval: 0,
  pool: [],
};

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  setVisible,
}) => {
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  const submitHandler = () => {
    setVisible(false);
    console.log(newTask, assignee, 'submit');
  };

  const [newTask, setNewTask] = useState(initialValue);

  const [assignee, setAssignee] = useState(people[0]);
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
                const newDueDate = new Date(timeStamp);
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

            <AssigneeCombobox
              selected={assignee}
              setSelected={setAssignee}
              assigneePool={people}
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
    </div>
  );
};

export default CreateTaskModal;
