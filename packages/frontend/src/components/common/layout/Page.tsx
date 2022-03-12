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
      <Navigation />

      <div className="flex-grow self-center px-10 max-w-5xl w-full">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
