import React from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

interface PageProps {}

/**
 * Generic page used by pages in the app (i.e. not public pages)
 */
const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>

      <div className="self-center flex-grow w-full max-w-5xl px-10">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
