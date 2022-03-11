import { Button, Spacer, Text } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import ShareLinkModal from '../../components/ShareLinkModal';
import { LinkIcon } from '@heroicons/react/outline';
import HouseConflictModal from '../../components/HouseConflictModal';

interface HomePageProps {
  alreadyInFlat: boolean;
}

const HomePage: React.FC<HomePageProps> = ({
  alreadyInFlat,
}: HomePageProps) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  // TODO: call api endpoint
  const joinHouse = () => {
    if (localStorage.getItem('code')) {
      console.log('user added to the house');
    }
  };
  useEffect(() => {
    joinHouse();
  }, []);

  const [conflictVisible, conflictsetVisible] = useState(alreadyInFlat);

  // const { data } = useApi('/api/v1/ping', {
  //   method: 'get',
  // });
  // if (data) {
  //   const { env, time, user } = data;
  //   console.log({ env, time, user });
  // }

  return (
    <div>
      <HouseConflictModal
        visible={conflictVisible}
        setVisible={conflictsetVisible}
      />
      <Text h1> Hello </Text>
      <p>{user?.displayName}</p>
      <Button size="sm">Small</Button>
      <Spacer y={1} />
      <Button
        auto
        rounded
        onClick={onClick}
        icon={<LinkIcon className="h-5 w-5" />}
      >
        Get Link
      </Button>
      <ShareLinkModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default HomePage;
