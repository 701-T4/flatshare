import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

interface PageProps {}

/**
 * Generic page used by pages in the app (i.e. not public pages)
 */
const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navigation />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
