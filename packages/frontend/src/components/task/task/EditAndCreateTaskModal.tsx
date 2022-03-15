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
  currentTaskName = null,
  currentAssignee = null,
  currentTaskDescription = null,
}) => {
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  const [taskName, setTaskName] = useState(currentTaskName);
  const [taskDescription, settaskDescription] = useState(
    currentTaskDescription,
  );
  const [assignee, setAssignee] = useState(currentAssignee);

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
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
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
            className="focus:border-teal-500"
          />
          <Textarea
            aria-label="Task Description"
            bordered
            size="lg"
            color="primary"
            label="Description"
            placeholder="Enter the task description."
          />
          <AssigneeCombobox assigneePool={people} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button auto onClick={closeHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAndCreateTaskModal;
