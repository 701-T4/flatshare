import { PlusIcon } from '@heroicons/react/outline';

interface CreateNewTaskButtonProps {
  onClick: () => void;
}

const CreateNewTaskButton: React.FC<CreateNewTaskButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      className="flex items-center px-2 py-1 -m-1 transition-all bg-gray-700 bg-opacity-0 rounded-lg cursor-pointer gap-x-1 hover:bg-opacity-5"
      onClick={onClick}
    >
      <span className="font-semibold text-md">Create</span>
      <PlusIcon className="w-6" />
    </div>
  );
};

export default CreateNewTaskButton;
