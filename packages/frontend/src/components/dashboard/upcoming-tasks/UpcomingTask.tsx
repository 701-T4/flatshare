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
        <div className="flex flex-col h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8 gap-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-teal-500 md:text-xl">
                {title}
              </div>
              <div className="text-xs font-medium text-white md:text-sm">
                {dueString}
              </div>
            </div>
            {/* prevent event bubbling for complete operation */}
            <div onClick={(e) => e.stopPropagation()}>
              <button
                className={cx(
                  'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit',
                  { 'w-16': completed, 'w-32': !completed },
                )}
                onClick={clickWrapper}
              >
                {completed ? (
                  <CheckCircleIcon className="w-6" />
                ) : (
                  <>Complete</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UpcomingTask.Variation = Variation;

export default UpcomingTask;
