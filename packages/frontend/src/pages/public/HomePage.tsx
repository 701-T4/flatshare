import React from 'react';
import { Button, Text } from '@nextui-org/react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });
  if (data) {
    // const { env, time, user } = data;
    // console.log({ env, time, user });
  }

  const { user } = useAuth();

  return (
    <div>
      <Text h1> Hello </Text>
      <p>{user?.displayName}</p>
      <Button size="sm">Small</Button>
    </div>
  );
};

export default HomePage;
