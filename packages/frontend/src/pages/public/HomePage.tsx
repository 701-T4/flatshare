import { Button, Spacer, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import ShareLinkModal from '../../components/ShareLinkModal';
import { LinkIcon } from '@heroicons/react/outline';

interface HomePageProps {}

// TODO: file to be reverted back and changes to be moved to dashboard feature
const HomePage: React.FC<HomePageProps> = () => {
  console.log(window.location.href);
  // Logic to be moved ================================
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  // ==================================================

  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });
  if (data) {
    const { env, time } = data;
    console.log({ env, time });
  }
  const { user } = useAuth();

  return (
    <div>
      <Text h1> Hello </Text>
      <p>{user.displayName}</p>
      <Button size="sm">Small</Button>
      {/* Logic to be moved ==========================*/}
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
      {/* ============================================*/}
    </div>
  );
};

export default HomePage;
