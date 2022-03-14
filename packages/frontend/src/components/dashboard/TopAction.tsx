import React from 'react';

export interface TopActionProps {
  title?: string;
  img?: string;
  twGradientStart?: string;
  twGradientEnd?: string;
  twOpacity?: string;
  description?: string;
  onClick?: () => void;
}

export const TopAction: React.FC<TopActionProps> = ({
  img,
  title,
  twGradientEnd,
  twGradientStart,
  twOpacity,
  onClick,
  description,
}) => {
  return (
    <div className="w-full h-32 md:h-44 rounded-lg p-2 relative overflow-hidden shadow-md">
      <img
        draggable={false}
        className="cursor-pointer z-10 w-full absolute left-0 top-0 h-full object-cover hover:rotate-3 scale-105 hover:scale-110 transform transition-all back-ease brightness-75"
        src={img}
        onClick={onClick}
        alt=""
      />

      <div
        className={`absolute z-20 pointer-events-none left-0 top-0 w-full ${twOpacity} h-full ${twGradientStart} ${twGradientEnd} bg-gradient-to-br`}
      />
      <div className="absolute z-30 pointer-events-none w-full h-full top-0 left-0">
        <div className="flex items-center p-1 xs:p-4 xl:p-1 h-full">
          <div className="w-2 xs:w-6 xl:w-2 h-full" />
          <div className="flex flex-col px-1 xs:px-3 text-shadow-md">
            <div className="mb-3 flex flex-col">
              <span className="text-xl font-bold text-white">{title}</span>
            </div>
            <div className="text-white font-medium text-sm">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAction;
