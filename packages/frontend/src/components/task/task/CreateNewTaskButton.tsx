import { Button } from '@nextui-org/react';

interface CreateNewTaskButtonProps {
  onClick: () => void;
}

const CreateNewTaskButton: React.FC<CreateNewTaskButtonProps> = ({
  onClick,
}) => {
  return (
    <Button className="bg-teal-500" onClick={onClick}>
      <span className="font-semibold text-md">New Task</span>
    </Button>
  );
};

export default CreateNewTaskButton;
