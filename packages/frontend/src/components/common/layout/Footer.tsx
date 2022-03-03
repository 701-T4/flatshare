import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="opacity-50 w-full mt-8">
      <div className="w-full text-center p-4">Copyright Team 4</div>
    </div>
  );
};

export default Footer;
