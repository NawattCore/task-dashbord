import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  CustomTooltipWrapper,
} from '@/components/ui/chart';

const AreaChartComponent = ({
  chartData,
  chartConfig,
}: {
  chartData: {
    month: string;
    visits: number;
  }[];
  chartConfig: ChartConfig;
}) => {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        dir="ltr"
        className="mt-10 max-sm:scale-105 "
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 20,
            top: 5,
          }}
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
            axisLine={{ stroke: 'rgba(255,255,255,0.25)' }}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            orientation="right"
            axisLine={{ stroke: 'rgba(255,255,255,0.25)' }}
            tickMargin={2}
            width={45}
          />
          <ChartTooltip
            cursor={false}
            content={({ payload }) => {
              if (!payload || payload.length === 0 || !payload[0]) return null;
              return (
                <CustomTooltipWrapper offsetX={0} offsetY={-30}>
                  <div className="rounded-lg bg-[#00000033] backdrop-blur-md text-center font-bold lg:px-9 lg:py-4 px-4 py-2 lg:text-xl text-sm text-white shadow">
                    <span className="font-medium text-main-300">
                      الزيارات :
                    </span>{' '}
                    {payload[0].value}
                  </div>
                </CustomTooltipWrapper>
              );
            }}
          />
          K
          <Area
            dataKey="visits"
            type="bump"
            fill="#0089F066"
            fillOpacity={0.4}
            stroke="var(--color-main-200)"
          />
        </AreaChart>
      </ChartContainer>
      <style global jsx>
        {`
          .recharts-wrapper svg text,
          .recharts-wrapper text {
            fill: #fff !important;
          }
        `}
      </style>
    </>
  );
};

export default AreaChartComponent;
