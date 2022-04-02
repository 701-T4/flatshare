import React from 'react';
import Page from '../../components/common/layout/Page';
import DashboardAnnouncement from '../../components/dashboard/announcement/DashboardAnnouncement';
import UnderlinedText from '../../components/dashboard/GradientUnderlinedText';
import InviteButtonController from '../../components/dashboard/invite/InviteButtonController';
import QuickAccessPanel from '../../components/dashboard/QuickAccessPanel';
import { useHouse } from '../../hooks/useHouse';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  const navigate = useNavigate();

  const { name, latestAnnouncement } = useHouse();

  return (
    <Page>
      {latestAnnouncement && (
        <DashboardAnnouncement
          onViewAll={() => navigate('/announcement')}
          title={latestAnnouncement.title || 'New Announcement'}
          time={new Date(latestAnnouncement.dateCreated)}
          user={latestAnnouncement.author}
          description={
            latestAnnouncement.description || 'No description provided.'
          }
        />
      )}
      <div className="flex items-center justify-between pb-1">
        <UnderlinedText colorClasses="from-gray-800 via-teal-700 to-teal-500 ">
          <div className="text-lg font-medium">
            {'Welcome to '}
            <span className="font-semibold text-teal-500">{name}</span>
          </div>
        </UnderlinedText>
        <InviteButtonController />
      </div>
      <div className="my-4">
        <QuickAccessPanel />
      </div>
    </Page>
  );
};

export default DashboardPage;
