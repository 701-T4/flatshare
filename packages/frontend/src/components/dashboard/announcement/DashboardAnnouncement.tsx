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
      <div className="flex flex-col h-full max-w-full overflow-hidden">
        <h3 className="text-xl font-bold tracking-normal mb-2">
          Flat agreement rules
        </h3>
        <p className="text-xs mb-3">
          {'Time'}, {'Username'}
        </p>
        <p className="truncate ...">
          {
            'Description Description Description Description Description Description Description Description Description Description DescriptionDescriptionDescriptionDescription Description '
          }
        </p>
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
