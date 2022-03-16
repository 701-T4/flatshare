import React, { useState } from 'react';
import { Button, Input, Modal, Textarea } from '@nextui-org/react';
import AssigneeCombobox from './AssigneeCombobox';

interface EditAndCreateTaskModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  createTask: boolean;
  currentTaskName?: string;
  currentTaskDescription?: string;
  currentAssignee?: string;
}

const EditAndCreateTaskModal: React.FC<EditAndCreateTaskModalProps> = ({
  visible,
  setVisible,
  createTask,
  currentTaskName,
  currentAssignee,
  currentTaskDescription,
}) => {
  console.log(
    currentTaskName,
    currentAssignee,
    currentTaskDescription,
    'enter the modal',
  );

  const [key, setKey] = useState(0);

  const closeHandler = () => {
    setKey(key + 1);
    setVisible(false);
    console.log('closed');
  };

  const submitHandler = () => {
    setKey(key + 1);
    setVisible(false);
    console.log(taskName, taskDescription, assignee, 'submit');
  };

  const [taskName, setTaskName] = useState(currentTaskName);
  const [taskDescription, setTaskDescription] = useState(
    currentTaskDescription,
  );
  const [assignee, setAssignee] = useState({ id: 0, name: 'none' });

  console.log(taskName, taskDescription, assignee, 'before tsx');

  const people = [
    { id: 0, name: 'None' },
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ];

  return (
    <div>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <div key={key}>
          <Modal.Header>
            {createTask ? <p>Creating Task</p> : <p>Editing Task</p>}
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
              initialValue={taskName}
              className="focus:border-teal-500"
              onChange={(event) => setTaskName(event.target.value)}
            />
            <Textarea
              aria-label="Task Description"
              bordered
              size="lg"
              color="primary"
              label="Description"
              placeholder="Enter the task description."
              initialValue={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            />
            <AssigneeCombobox setAssignee={setAssignee} assigneePool={people} />
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

export default EditAndCreateTaskModal;
