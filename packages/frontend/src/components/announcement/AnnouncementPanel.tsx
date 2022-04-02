import AnnouncementCard, { AnnouncementCardProps } from './AnnouncementCard';

interface AnnouncementPanelProps {
  announcements: AnnouncementCardProps[];
}

const AnnouncementPanel: React.FC<AnnouncementPanelProps> = (props) => {
  return (
    <>
      {props.announcements.map((announcement) => (
        <AnnouncementCard {...announcement} />
      ))}
    </>
  );
};

export default AnnouncementPanel;
