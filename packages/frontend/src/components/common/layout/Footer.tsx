import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="w-full mt-8 opacity-50">
      <div className="w-full p-4 text-center">
        {'Copyright © 2022 SE701 Team 4 & Team 3'}
      </div>
    </div>
  );
};

export default Footer;
