import React, { useState } from 'react';
import { Button, Input, Modal, Textarea } from '@nextui-org/react';
import AssigneeSelectionList from './AssigneeSelectionList';

interface EditAndCreateTaskModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  createTask: boolean;
  currentTaskName?: string;
  currentTaskDescription?: string;
  currentAssignee?: string;
}

const EditTaskModal: React.FC<EditAndCreateTaskModalProps> = ({
  visible,
  setVisible,
  createTask,
  currentTaskName,
  currentAssignee,
  currentTaskDescription,
}) => {
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  const submitHandler = () => {
    setVisible(false);
    console.log(taskName, taskDescription, checkBoxValues, 'submit');
  };

  const [taskName, setTaskName] = useState(currentTaskName);
  const [taskDescription, setTaskDescription] = useState(
    currentTaskDescription,
  );
  const [checkBoxValues, setCheckBoxValues] = useState(['']);

  const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
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
        <div className="scrollbar-hide">
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
    </div>
  );
};

export default EditTaskModal;
