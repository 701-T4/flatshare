import React from 'react';
import { useApi } from '../../hooks/useApi';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { data } = useApi('/api/v1/ping');
  console.log(data);

  return <div>Hello</div>;
};

export default HomePage;
