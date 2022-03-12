import React from 'react';
import cx from 'classnames';

interface GradientUnderlinedTextProps {
  className?: string;
}

const GradientUnderlinedText: React.FC<GradientUnderlinedTextProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cx('w-fit', className)}>
      {children}
      <div className="h-0.5 bg-gradient-to-r from-teal-500 via-teal-700 to-gray-900 w-full" />
    </div>
  );
};

export default GradientUnderlinedText;
