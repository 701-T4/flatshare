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
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-row items-center justify-between p-12">
        <div className="flex flex-row items-center justify-start gap-12">
          <Text h1 size={50} color="white" weight="bold">
            LOGO
          </Text>
          <Text h1 size={50} color="white" weight="bold">
            RentShare
          </Text>
        </div>
        <Button
          bordered
          auto
          style={{ height: '60px', width: '140px', borderColor: 'white' }}
        >
          <Text size={28} color="white">
            Log In
          </Text>
        </Button>
      </div>

      <div className="grid max-w-screen-xl grid-cols-1 px-12 m-auto pt-14 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <Text h1 size={65} color="white" weight="bold">
            Flexible. Smart
          </Text>
          <Text h1 size={65} color="white" weight="bold">
            Dashboard
          </Text>
          <Text h5 size={20} color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a
            sem vel tellus tristique consectetur. Cras porttitor ut massa sit
            amet molestie.
          </Text>
          <div className="pt-20">
            <Button
              auto
              style={{
                boxShadow: '1px 4px 1px rgb(0 0 0 / 0.2)',
                height: '60px',
                width: '180px',
                backgroundColor: 'white',
              }}
            >
              <Text size={28} color="#2596A4" weight="bold">
                Get Started
              </Text>
            </Button>
          </div>
        </div>
        <Text h1 size={60} color="white" weight="bold" css={{ m: 100 }}>
          Image <br></br>Placeholder
        </Text>
      </div>
    </div>
  );
};

export default HomePage;
