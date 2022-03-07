import { Button, Text } from '@nextui-org/react';
import React from 'react';
import { useApi } from '../../hooks/useApi';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { data } = useApi('/api/v1/ping', {
    method: 'get',
  });
  if (data) {
    const { env, time } = data;
    console.log({ env, time });
  }

  return (
    <div>
      <Text h1> Hello </Text>
      <Button size="sm">Small</Button>
    </div>
  );
};

export default HomePage;
