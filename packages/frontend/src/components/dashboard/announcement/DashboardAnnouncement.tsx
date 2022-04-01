import { Button } from '@nextui-org/react';
import React from 'react';

interface DashboardAnnouncementProps {
  onViewAll: () => void;
}

const DashboardAnnouncement: React.FC<DashboardAnnouncementProps> = ({
  onViewAll,
}) => {
  return (
    <div className="rounded-xl p-6 mb-6 bg-gray-800  w-full flex flex-row justify-between text-white space-x-6">
      <div className="flex flex-col h-full "></div>
      <Button
        aria-label="View All Announcements"
        className="bg-teal-500"
        onClick={onViewAll}
      >
        View All Announcements
      </Button>
    </div>
  );
};

export default DashboardAnnouncement;
