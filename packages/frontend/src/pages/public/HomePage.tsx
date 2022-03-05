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

  return <div>Hello</div>;
};

export default HomePage;
