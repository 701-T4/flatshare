import { Button, Text } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-row items-center justify-between p-12">
        {/* Top bar with logo and the button */}
        <div className="flex flex-row items-center justify-start gap-12">
          <div className="w-24 h-12 bg-center bg-no-repeat bg-contain bg-logo" />
          <Text h1 size={50} color="white" weight="bold">
            RentShare
          </Text>
        </div>
        <Link to="/auth">
          <Button
            bordered
            auto
            style={{ height: '60px', width: '140px', borderColor: 'white' }}
          >
            <Text size={28} color="white">
              Log In
            </Text>
          </Button>
        </Link>
      </div>

      <div className="grid max-w-screen-xl grid-cols-1 gap-4 px-12 m-auto pt-14 lg:grid-cols-2">
        {/* left side area with texts */}
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
        {/* right side image */}
        <div className="w-full bg-center bg-no-repeat bg-contain h-96 bg-house" />
      </div>
    </div>
  );
};

export default LandingPage;
