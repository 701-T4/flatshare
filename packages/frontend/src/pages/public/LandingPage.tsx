import { Button, Text } from '@nextui-org/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto pb-28 gap-y-12 bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-row items-center justify-between gap-4 p-8 sm:p-12">
        {/* Top bar with logo and the button */}
        <div className="flex flex-row items-center justify-start gap-2 sm:gap-3">
          <div className="w-12 h-8 bg-center bg-no-repeat bg-contain sm:w-24 sm:h-12 bg-logo" />
          <h1 className="text-3xl font-bold text-white sm:text-5xl">
            FlatShare
          </h1>
        </div>
        <Link to="/auth">
          <Button
            className="float-right px-5 sm:px-6 sm:py-5"
            bordered
            auto
            style={{
              borderColor: 'white',
              display: 'flex',
            }}
          >
            <p className="text-base text-white sm:text-lg">Log In</p>
          </Button>
        </Link>
      </div>

      <div className="grid self-center max-w-screen-xl grid-cols-1 gap-4 px-12 lg:grid-cols-2">
        {/* left side area with texts */}
        <div className="flex flex-col items-start">
          <h1 className="text-6xl font-bold leading-normal text-white sm:leading-relaxed sm:text-7xl">
            Flexible, Smart <br /> Dashboard
          </h1>
          <h5 className="pt-2 text-2xl leading-relaxed tracking-normal text-white">
            The most efficient flat management system. <br /> Bring your life
            quality to another level with FlatShare.
          </h5>
          <div className="pt-12">
            <Link to="/auth">
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
            </Link>
          </div>
        </div>
        {/* right side image */}
        <div className="hidden w-full bg-center bg-no-repeat bg-contain sm:inline h-96 bg-house" />
      </div>
    </div>
  );
};

export default LandingPage;
