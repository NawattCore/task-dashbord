'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  CustomTooltipWrapper,
} from '@/components/ui/chart';

export const description = 'A reusable donut chart with text';

export type ChartPieDonutTextProps = {
  data: {
    browser: string;
    data: number;
    fill: string;
  }[];
  chartConfig: ChartConfig;
};

export function ChartPieDonutText({
  data,
  chartConfig,
}: ChartPieDonutTextProps) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.data, 0);
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            return (
              <CustomTooltipWrapper offsetX={125} offsetY={-30}>
                <div className="rounded-lg bg-[#00000033] backdrop-blur-md text-center font-bold lg:px-9 lg:py-4 px-4 py-2 lg:text-3xl text-sm text-white shadow">
                  {payload?.[0]?.value}
                </div>
              </CustomTooltipWrapper>
            );
          }}
        />
        <Pie
          data={data}
          dataKey="data"
          nameKey="browser"
          innerRadius={50}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-white text-3xl font-bold"
                      direction="rtl"
                    >
                      {data[0]?.data
                        ? Math.round((data[0].data / totalVisitors) * 100)
                        : 0}{' '}
                      %
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
