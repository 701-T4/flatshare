import React from 'react';
import Page from '../../components/common/layout/Page';
import GradientUnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import InviteButton from '../../components/dashboard/invite/InviteButton';
import InviteButtonController from '../../components/dashboard/invite/InviteButtonController';
import QuickAccessPanel from '../../components/dashboard/QuickAccessPanel';
import NoUpcomingTasks from '../../components/dashboard/upcoming-tasks/NoUpcomingTasks';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import { useHouse } from '../../hooks/useFlat';

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  const { name } = useHouse();

  return (
    <Page>
      <div className="flex justify-between items-center pb-1">
        <GradientUnderlinedText>
          <div className="text-lg font-medium">
            <span className="text-teal-500 font-semibold">{'Welcome to '}</span>
            {name}
          </div>
        </GradientUnderlinedText>
        <InviteButtonController />
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
          completed
        />
      </div>
      <NoUpcomingTasks />
    </Page>
  );
};

export default DashboardPage;
