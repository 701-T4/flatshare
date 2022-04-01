import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import AnnouncementCard, {
  AnnouncementCardProps,
} from '../../components/announcement/AnnouncementCard';
import AnnouncementModalForm from '../../components/announcement/AnnouncementModalForm';
import Page from '../../components/common/layout/Page';

interface AnnouncementPageProps {}

const AnnouncementPage: React.FC<AnnouncementPageProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [announcementList, setAnnouncementList] = useState<
    AnnouncementCardProps[]
  >([]);

  const handleOnSave = (title: string, detail: string) => {
    console.log('title: ', title);
    console.log('details: ', detail);
  };

  const fakedata: AnnouncementCardProps[] = [
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
    {
      title: 'title',
      detail: 'detail',
      time: 'time',
      userName: 'usename',
    },
  ];

  useEffect(() => {
    setAnnouncementList(fakedata);
  }, []);

  return (
    <Page>
      <div>
        <Button className="rounded-lg" onClick={() => setModalVisible(true)}>
          New Announcement
        </Button>
        <AnnouncementModalForm
          visible={modalVisible}
          setVisible={setModalVisible}
          onSaveAnnouncement={handleOnSave}
        />
        <div className="flex flex-col mt-8 gap-y-3">
          {announcementList.length > 0 ? (
            announcementList.map((announcement) => {
              return (
                <AnnouncementCard
                  title={announcement.title}
                  detail={announcement.detail}
                  time={announcement.time}
                  userName={announcement.userName}
                />
              );
            })
          ) : (
            <div>No announcements found, post one now :)</div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default AnnouncementPage;
