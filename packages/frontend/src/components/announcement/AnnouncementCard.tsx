import { Card, Spacer } from '@nextui-org/react';

export interface AnnouncementCardProps {
  title: string;
  detail: string;
  time: string;
  userName: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = (props) => {
  return (
    <>
      <Card
        shadow={false}
        css={{
          backgroundColor: '#1D2530',
          borderRadius: '13px',
          padding: '4px',
        }}
      >
        <div className="flex justify-between">
          <span className="self-start text-xl font-bold text-white">
            {props.title}
          </span>
          <span className="self-end text-m text-white">
            {props.time}, {props.userName}
          </span>
        </div>
        <Spacer y={0.5} />
        <span className="text-m text-white">{props.detail}</span>
        <Spacer y={0.5} />
      </Card>
    </>
  );
};

export default AnnouncementCard;
