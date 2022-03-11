import React from 'react';
import { Button, Text } from '@nextui-org/react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
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
