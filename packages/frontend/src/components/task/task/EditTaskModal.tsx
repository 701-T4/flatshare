import React, { useState } from 'react';
import { Button, Input, Modal, Textarea } from '@nextui-org/react';
import AssigneeSelectionList from './AssigneeSelectionList';
import { useApiMutation } from '../../../hooks/useApi';
import ErrorModal from './ErrorModal';

interface EditAndCreateTaskModalProps {
  visible: boolean;
  setVisible(value: boolean): void;
  createTask: boolean;
  currentTaskName: string;
  currentTaskDescription: string;
  currentSelectedPeople: string[];
  userId: string;
}

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];

const EditTaskModal: React.FC<EditAndCreateTaskModalProps> = ({
  visible,
  setVisible,
  createTask,
  currentTaskName,
  currentTaskDescription,
  currentSelectedPeople,
  userId,
}) => {
  const [taskName, setTaskName] = useState(currentTaskName);
  const [taskDescription, setTaskDescription] = useState(
    currentTaskDescription,
  );
  const [checkBoxValues, setCheckBoxValues] = useState<string[]>(
    currentSelectedPeople,
  );
  const [visibleErrorModal, setVisibleErrorModal] = React.useState(false);

  const editTask = useApiMutation('/api/v1/house/tasks/{id}', {
    method: 'put',
  });

  const closeHandler = () => {
    setVisible(false);
  };

  const submitHandler = async () => {
    const result = await editTask({
      pathParams: { id: userId },
      body: {
        name: taskName,
        description: taskDescription,
        pool: checkBoxValues,
      },
    });
    result.name === taskName ? setVisible(false) : setVisibleErrorModal(true);
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
      <ErrorModal
        visibleErrorModal={visibleErrorModal}
        setVisibleErrorModal={setVisibleErrorModal}
        errorMessage="Cannot create the task."
      />
    </div>
  );
};

export default EditTaskModal;
