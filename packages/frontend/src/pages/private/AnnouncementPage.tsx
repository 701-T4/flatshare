import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../../components/announcement/AnnouncementCard';
import AnnouncementModalForm from '../../components/announcement/AnnouncementModalForm';
import Page from '../../components/common/layout/Page';
import { useApi, useApiMutation } from '../../hooks/useApi';

interface AnnouncementResponseProp {
  title?: string | undefined;
  description?: string | undefined;
  author: string;
  houseCode: string;
  dateCreated: string;
}

const AnnouncementPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [announcementList, setAnnouncementList] = useState<
    AnnouncementResponseProp[]
  >([]);

  const [loading, setLoading] = useState(true);

  const publishAnnouncement = useApiMutation('/api/v1/house/announcements', {
    method: 'post',
  });

  const handleOnSave = async (title: string, description: string) => {
    const data = {
      title: title,
      description: description,
    };
    await publishAnnouncement({ body: data });
    window.location.reload();
  };

  const { data } = useApi('/api/v1/house/announcements', {
    method: 'get',
  });

  useEffect(() => {
    if (data !== undefined) {
      setAnnouncementList(data.announcements);
      setLoading(false);
    }
  }, [data]);

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
        {!loading && (
          <div className="flex flex-col mt-8 gap-y-3">
            {announcementList.length > 0 ? (
              announcementList.map((announcement, index) => {
                return (
                  <AnnouncementCard
                    key={index}
                    title={announcement.title!}
                    detail={announcement.description!}
                    time={new Date(announcement.dateCreated).toLocaleString()}
                    userName={announcement.author}
                  />
                );
              })
            ) : (
              <div>No announcements found, post one now :)</div>
            )}
          </div>
        )}
      </div>
    </Page>
  );
};

export default AnnouncementPage;
