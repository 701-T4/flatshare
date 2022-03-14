import React from 'react';
import cx from 'classnames';
import { CheckCircleIcon } from '@heroicons/react/outline';

const Variation = {
  red: 'bg-gradient-to-r from-red-400 to-red-600',
  amber: 'bg-gradient-to-r from-amber-400 to-amber-600',
  teal: 'bg-gradient-to-r from-teal-400 to-teal-600',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
};

interface UpcomingTaskProps {
  title?: string;
  twColor?: string;
  dueString?: string;
  type: 'Task' | 'Bill';
  completed?: boolean;
  onCompleteClick?: () => void;
}

const UpcomingTask: React.FC<UpcomingTaskProps> & {
  Variation: typeof Variation;
} = ({ title, dueString, twColor, type, completed, onCompleteClick }) => {
  const clickWrapper = () => {
    if (completed) {
    }
    onCompleteClick?.();
  };

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div
          className={cx(
            twColor,
            'text-left rounded-t-xl px-4 py-1 text-white font-semibold text-lg',
          )}
        >
          {type}
        </div>
        <div className="rounded-b-xl px-4 lg:px-8 py-4 flex flex-col gap-y-1 bg-gray-800 h-full">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-base md:text-xl text-teal-500">
                {title}
              </div>
              <div className="font-medium text-xs md:text-sm text-white">
                {dueString}
              </div>
            </div>
            <button
              className={cx(
                'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit',
                { 'w-16': completed, 'w-32': !completed },
              )}
              onClick={clickWrapper}
            >
              {completed ? <CheckCircleIcon className="w-6" /> : <>Complete</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UpcomingTask.Variation = Variation;

export default UpcomingTask;
