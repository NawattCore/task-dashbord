import React from 'react';
import { Calendar2 } from 'iconsax-reactjs';

import AnimatedCard from '@/components/layout/card';
import { ChartConfig } from '@/components/ui/chart';
import BarChartComponent from '@/components/charts/bar';
import FilterPopover from '@/components/tables/filter-popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

const CampaignsBars = ({
  chartData,
  chartConfig,
}: {
  chartData: {
    month: string;
    active: number;
    inactive: number;
  }[];
  chartConfig: ChartConfig;
}) => {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined);
  return (
    <AnimatedCard
      topRightCircleClassName="right-0"
      bottomLeftCircleClassName="left-0"
      childClassName="p-6 space-y-3"
    >
      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="space-y-2">
          <h2 className="lg:text-2xl text-xl text-white">الحملات الإعلانية</h2>
          <p className="text-main-mute lg:text-base text-sm">
            الحملات التي تم إطلاقها في العام الحالي
          </p>
        </div>

        <FilterPopover
          title={
            fromDate && toDate
              ? `${fromDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })} - ${toDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}`
              : 'التاريخ'
          }
          startIcon={<Calendar2 variant="Bold" className="size-5" />}
        >
          <div className=" max-sm:w-[300px]">
            <div className="flex sm:gap-4 gap-2 flex-1">
              <Input
                placeholder="من"
                value={
                  fromDate
                    ? fromDate.toLocaleDateString('ar-EG', {
                        day: 'numeric',
                        month: 'long',
                      })
                    : ''
                }
                readOnly
                className="rounded-lg bg-transparent"
              />
              <Input
                placeholder="الي"
                value={
                  toDate
                    ? toDate.toLocaleDateString('ar-EG', {
                        day: 'numeric',
                        month: 'long',
                      })
                    : ''
                }
                readOnly
                className="rounded-lg bg-transparent"
              />
              <Button
                variant="main"
                className=" lg:text-lg text-sm bg-main-300 sm:px-5 px-10"
              >
                تطبيق
              </Button>
            </div>

            <div className="flex justify-between overflow-auto">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                className="rounded-lg"
              />
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                className="rounded-lg"
              />
            </div>
          </div>
        </FilterPopover>
      </div>
      <BarChartComponent chartData={chartData} chartConfig={chartConfig} />
    </AnimatedCard>
  );
};

export default CampaignsBars;
