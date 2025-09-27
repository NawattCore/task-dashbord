import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  subtitle,
  color,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-2xl lg:px-7 px-5 py-4  ${className}`}
      style={{
        backgroundColor: `${color}14`,
      }}
    >
      {/* Content */}
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex-1">
          <div className="lg:text-[40px] text-2xl font-bold text-white ">
            {title}
          </div>
          <div className="lg:text-lg sm:text-base text-xs  text-gray-300 font-light">
            {subtitle}
          </div>
        </div>

        {/* Icon Circle */}
        <div
          className={`lg:size-16 md:size-12 sm:size-10 size-8 shrink-0 rounded-full flex items-center justify-center ml-4`}
          style={{
            backgroundColor: color,
          }}
        >
          <div className="text-white [&_svg]:lg:size-7 [&_svg]:md:size-6 [&_svg]:size-5">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
