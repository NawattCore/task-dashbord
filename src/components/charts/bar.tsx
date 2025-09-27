import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  CustomTooltipWrapper,
} from '@/components/ui/chart';

const BarChartComponent = ({
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
  return (
    <ChartContainer config={chartConfig} className="max-sm:scale-105 ">
      <BarChart
        accessibilityLayer
        data={chartData}
        barSize={15}
        margin={{ bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="5 5"
          strokeDashoffset={50}
          strokeOpacity={1}
          strokeWidth={1}
          stroke="#FFFFFF0F"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          tickMargin={20}
          axisLine={true}
          width={45}
          orientation="right"
        />
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            return (
              <CustomTooltipWrapper offsetX={0} offsetY={-30}>
                <div className="rounded-lg bg-[#00000033] backdrop-blur-md text-start font-bold lg:px-9 lg:py-4 px-4 py-2 lg:text-xl text-sm text-white shadow">
                  <div>
                    <span className="font-medium text-main-300">النشطة :</span>{' '}
                    {payload[0]?.value}
                  </div>
                  <div>
                    <span className="font-medium text-main-100">
                      الغير نشطة :
                    </span>{' '}
                    {payload[1]?.value}
                  </div>
                </div>
              </CustomTooltipWrapper>
            );
          }}
        />

        <Bar dataKey="active" fill="var(--main-300)" radius={4} />
        <Bar dataKey="inactive" fill="var(--main-100)" radius={4} />

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          formatter={value => (
            <span
              className="text-white text-xs"
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              {chartConfig[value]?.label || value}
            </span>
          )}
          wrapperStyle={{
            paddingTop: 20,
          }}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartComponent;
