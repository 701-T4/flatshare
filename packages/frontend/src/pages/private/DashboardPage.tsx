import React from 'react';
import Page from '../../components/common/layout/Page';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import InviteButtonController from '../../components/dashboard/invite/InviteButtonController';
import QuickAccessPanel from '../../components/dashboard/QuickAccessPanel';
import NoUpcomingTasks from '../../components/dashboard/upcoming-tasks/NoUpcomingTasks';
import UpcomingTask from '../../components/dashboard/upcoming-tasks/UpcomingTask';
import { useHouse } from '../../hooks/useHouse';

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  const { name } = useHouse();

  return (
    <Page>
      <div className="flex justify-between items-center pb-1">
        <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500 ">
          <div className="text-lg font-medium">
            {'Welcome to '}
            <span className="text-teal-500 font-semibold">{name}</span>
          </div>
        </UnderlinedText>
        <InviteButtonController />
      </div>
      <div className="my-4">
        <QuickAccessPanel />
      </div>
      <UnderlinedText colorClasses="bg-gray-800">
        <div className="text-lg font-semibold">Upcoming Tasks</div>
      </UnderlinedText>
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
