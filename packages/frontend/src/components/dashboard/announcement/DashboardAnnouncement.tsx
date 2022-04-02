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
    <div className="flex flex-col justify-between w-full p-6 mb-6 space-x-8 text-white bg-gray-800 sm:flex-row rounded-xl">
      <div className="flex flex-col h-full max-w-full overflow-hidden">
        <h3 className="mb-2 text-xl font-bold tracking-normal">{title}</h3>
        <p className="mb-3 text-sm font-semibold">
          {time.toLocaleString()}, {user}
        </p>
        <p className="text-base font-normal truncate ...">{description}</p>
      </div>
      <Button
        aria-label="View All Announcements"
        className="self-center mt-5 bg-teal-500 sm:mt-0"
        onClick={onViewAll}
      >
        View All Announcements
      </Button>
    </div>
  );
};

export default DashboardAnnouncement;
