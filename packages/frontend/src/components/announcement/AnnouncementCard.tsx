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
        className="px-3 pt-5 pb-3 shadow-lg"
        shadow={false}
        css={{
          backgroundColor: '#1D2530',
          borderRadius: '13px',
        }}
      >
        <div className="flex flex-col justify-between gap-y-3 sm:flex-row">
          <span className="self-start text-xl font-bold text-white">
            {props.title}
          </span>
          <span className="self-start text-sm font-semibold text-white sm:self-end">
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
