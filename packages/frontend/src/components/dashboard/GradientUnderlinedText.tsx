import React from 'react';
import cx from 'classnames';

interface UnderlinedTextProps {
  className?: string;
  colorClasses?: string;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({
  children,
  className,
  colorClasses,
}) => {
  return (
    <div className={cx('w-fit', className)}>
      {children}
      <div className={cx('h-0.5 bg-gradient-to-r w-full', colorClasses)} />
    </div>
  );
};

export default UnderlinedText;
