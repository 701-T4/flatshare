import React from 'react';
import cx from 'classnames';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';

const Variation = {
  red: 'bg-gradient-to-r from-red-400 to-red-600',
  amber: 'bg-gradient-to-r from-amber-400 to-amber-600',
  teal: 'bg-gradient-to-r from-teal-400 to-teal-600',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
  gray: 'bg-gradient-to-r from-gray-600 to-gray-400',
  blue: 'bg-gradient-to-r from-blue-500 to-teal-700',
};

interface UpcomingTaskProps {
  title?: string;
  twColor?: string;
  dueString?: string;
  overdue?: boolean;
  type: 'Task' | 'Bill' | 'Issue';
  completed?: boolean;
  past?: boolean;
  onCompleteClick?: () => void;
  onDetailClick?: () => void;
  disabled?: boolean;
}

const UpcomingTask: React.FC<UpcomingTaskProps> & {
  Variation: typeof Variation;
} = ({
  title,
  dueString,
  overdue,
  twColor,
  type,
  completed,
  past,
  onCompleteClick,
  onDetailClick,
  disabled,
}) => {
  const clickWrapper = () => {
    if (disabled) {
      return;
    }
    onCompleteClick?.();
  };

  const includeDetailsLink = ['Bill', 'Issue'];

  let completeText = 'Complete';
  if (type === 'Issue') {
    completeText = 'Resolve';
  }

  return (
    <div className="shadow-lg rounded-b-xl">
      <div className="flex flex-col h-full">
        <div
          className={cx(
            twColor,
            'text-left rounded-t-xl px-4 py-1 text-white font-semibold text-lg',
            { [Variation.gray]: disabled },
          )}
        >
          <div className="flex flex-row justify-between">
            {type}
            {includeDetailsLink.includes(type) && !past && (
              <button
                className="flex items-center justify-center w-16 text-sm font-semibold text-white rounded-md hover:bg-red-500"
                onClick={onDetailClick}
                disabled={disabled}
              >
                Detail
                <ChevronDoubleRightIcon className="w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col h-full px-4 py-4 bg-gray-800 rounded-b-xl lg:px-8 gap-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-teal-500 md:text-xl">
                {title}
              </div>
              <div
                className={cx('text-xs font-medium md:text-sm ', {
                  'text-white': !overdue,
                  'text-red-500': overdue,
                })}
              >
                {dueString}
              </div>
            </div>
            <button
              className={cx(
                'text-white flex justify-center items-center transition-all bg-teal-500 hover:bg-teal-400 rounded-full px-4 py-2 font-medium h-fit disabled:bg-gray-500',
                { 'w-16': completed, 'w-32': !completed },
              )}
              onClick={clickWrapper}
              disabled={disabled}
            >
              {completed ? (
                <CheckCircleIcon className="w-6" />
              ) : (
                <>{completeText}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UpcomingTask.Variation = Variation;

export default UpcomingTask;
