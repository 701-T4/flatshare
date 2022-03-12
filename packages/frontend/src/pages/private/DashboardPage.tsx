import React, { useState } from 'react';
import Page from '../../components/common/layout/Page';
import QuickAccessPanel from '../../components/dashboard/QuickAccessPanel';
import GradientUnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import { useAuth } from '../../hooks/useAuth';
import { useHouse } from '../../hooks/useFlat';
import { ShareIcon } from '@heroicons/react/outline';
import NoUpcomingTasks from '../../components/dashboard/upcoming-tasks/NoUpcomingTasks';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  const { name } = useHouse();

  const [completed, setCompleted] = useState(false);

  return (
    <Page>
      <div className="flex justify-between items-center pb-1">
        <GradientUnderlinedText>
          <div className="text-lg font-medium">
            <span className="text-teal-500 font-semibold">{'Welcome to '}</span>
            {name}
          </div>
        </GradientUnderlinedText>
        <div className="items-center gap-x-1 flex -m-1 px-2 py-1 rounded-lg bg-opacity-0 hover:bg-opacity-5 bg-gray-700 cursor-pointer transition-all">
          <span className="text-md font-semibold">Invite</span>
          <ShareIcon className="w-6" />
        </div>
      </div>
      <div className="my-4">
        <QuickAccessPanel />
      </div>
      <GradientUnderlinedText>
        <div className="text-lg font-medium">
          <span className="text-teal-500 font-semibold">{'Upcoming'}</span>
          <span>{' Tasks'}</span>
        </div>
      </GradientUnderlinedText>
      <div className="mt-4 md:grid md:grid-cols-2 flex flex-col gap-4">
        <UpcomingTask
          title="Take out the Rubbish"
          dueString="Due Tomorrow"
          twColor={UpcomingTask.Variation.red}
          type="Task"
        />
        <UpcomingTask
          title="Do the Dishes"
          dueString="Due Tomorrow"
          twColor={UpcomingTask.Variation.amber}
          type="Task"
          completed={completed}
          onCompleteClick={() => setCompleted(true)}
        />
      </div>
      <NoUpcomingTasks />
    </Page>
  );
};

export default DashboardPage;
