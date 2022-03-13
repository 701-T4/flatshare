import React from 'react';

interface LoaderPageProps {}

const LoaderPage: React.FC<LoaderPageProps> = () => {
  return (
    <div className="w-screen h-screen fixed z-[100] top-0 left-0 bg-gray-50">
      <div className="w-full h-full flex flex-col justify-center items-center text-2xl font-bold text-gray-900 gap-y-4">
        <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_jv0xz0qi.json"
          background="transparent"
          speed="1"
          style={{ width: '450px', height: '450px', margin: '-8rem' }}
          loop
          autoplay
        />
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default LoaderPage;
