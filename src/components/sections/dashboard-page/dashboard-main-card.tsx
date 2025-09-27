import { ProfileDelete, ProfileTick } from 'iconsax-reactjs';
import React from 'react';

import {
  ChartPieDonutText,
  ChartPieDonutTextProps,
} from '@/components/charts/pie';
import AnimatedCard from '@/components/layout/card';
import { Separator } from '@/components/ui/separator';

const DashboardMainCard = ({
  data,
  chartConfig,
  title,
  subtitle,
  firstNumber,
  secondNumber,
}: ChartPieDonutTextProps & {
  title: string;
  subtitle: string;
  firstNumber: string;
  secondNumber: string;
}) => {
  return (
    <AnimatedCard
      topRightCircleClassName="right-0"
      bottomLeftCircleClassName="left-0"
      childClassName="p-6 h-fit"
      parentClassName="h-fit"
    >
      <div className="flex flex-col sm:flex-row justify-between space-x-32 max-xl:flex-wrap max-lg:flex-nowrap">
        {/* Left Section */}
        <div className=" space-y-2 w-full ">
          <h2 className="lg:text-2xl text-xl  text-white">{title}</h2>
          <p className="text-main-mute lg:text-base text-sm">{subtitle}</p>

          <div className="lg:space-y-6 space-y-4 mt-8">
            <div className="flex items-center gap-4 text-lg xl:text-2xl text-white">
              <div className="flex items-center rounded-full p-2 bg-main-green/20">
                <ProfileTick variant="Bold" className="text-main-green" />
              </div>
              {firstNumber}
            </div>

            <Separator className="lg:max-w-2/3" />

            <div className="flex items-center gap-4 text-lg xl:text-2xl text-white">
              <div className="flex items-center rounded-full p-2 bg-main-red/20">
                <ProfileDelete variant="Bold" className="text-main-red" />
              </div>
              {secondNumber}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="
         sm:w-[250px] flex justify-center lg:justify-end"
        >
          <ChartPieDonutText data={data} chartConfig={chartConfig} />
        </div>
      </div>
    </AnimatedCard>
  );
};

export default DashboardMainCard;
