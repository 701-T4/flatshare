import { Button } from '@nextui-org/react';
import React from 'react';

interface DashboardAnnouncementProps {
  onViewAll: () => void;
  title: string;
  time: Date;
  user: string;
  description: string;
}

const DashboardAnnouncement: React.FC<DashboardAnnouncementProps> = ({
  onViewAll,
  title,
  time,
  user,
  description,
}) => {
  return (
    <div className="rounded-xl p-6 mb-6 bg-gray-800  w-full flex flex-row justify-between text-white space-x-8">
      <div className="flex flex-col h-full max-w-full overflow-hidden">
        <h3 className="text-xl font-bold tracking-normal mb-2">{title}</h3>
        <p className="text-xs mb-3">
          {time.toLocaleString()}, {user}
        </p>
        <p className="truncate ...">{description}</p>
      </div>
      <Button
        aria-label="View All Announcements"
        className="bg-teal-500 self-center"
        onClick={onViewAll}
      >
        View All Announcements
      </Button>
    </div>
  );
};

export default DashboardAnnouncement;
