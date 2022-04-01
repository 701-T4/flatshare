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
        className="px-3 pt-5 pb-3"
        shadow={false}
        css={{
          backgroundColor: '#1D2530',
          borderRadius: '13px',
        }}
      >
        <div className="flex justify-between">
          <span className="self-start text-xl font-bold text-white">
            {props.title}
          </span>
          <span className="self-end text-sm font-semibold text-white">
            {props.time}, {props.userName}
          </span>
        </div>
        <Spacer y={0.5} />
        <span className="text-base leading-relaxed text-justify text-white">
          {props.detail}
        </span>
        <Spacer y={0.5} />
      </Card>
    </>
  );
};

export default AnnouncementCard;
