import { PlusIcon } from '@heroicons/react/outline';

interface CreateNewTaskButton {
  onClick: () => void;
}

const CreateNewTaskButton: React.FC<CreateNewTaskButton> = ({ onClick }) => {
  return (
    <div
      className="items-center gap-x-1 flex -m-1 px-2 py-1 rounded-lg bg-opacity-0 hover:bg-opacity-5 bg-gray-700 cursor-pointer transition-all"
      onClick={onClick}
    >
      <span className="text-md font-semibold">Create</span>
      <PlusIcon className="w-6" />
    </div>
  );
};

export default CreateNewTaskButton;
