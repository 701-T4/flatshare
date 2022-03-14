import React from 'react';
import { ReactComponent as RelaxImage } from '../../../res/svg/relax.svg';

interface NoUpcomingTasksProps {}

const NoUpcomingTasks: React.FC<NoUpcomingTasksProps> = () => {
  return (
    <div className="w-full relative text-gray-900 flex flex-col items-center">
      <RelaxImage className="w-48 h-48 " />
      <div className="mx-auto max-w-prose text-lg font-medium text-center">
        <span className="">There is nothing coming up this week.</span>
      </div>
    </div>
  );
};

export default NoUpcomingTasks;
