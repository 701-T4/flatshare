import React from 'react';

interface GradientUnderlinedTextProps {}

const GradientUnderlinedText: React.FC<GradientUnderlinedTextProps> = ({
  children,
}) => {
  return (
    <div className="pb-4 w-fit">
      {children}
      <div className="h-0.5 bg-gradient-to-r from-teal-500 via-teal-700 to-gray-900 w-full" />
    </div>
  );
};

export default GradientUnderlinedText;
