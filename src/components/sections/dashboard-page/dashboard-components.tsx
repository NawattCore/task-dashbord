'use client';
import React from 'react';
import { Eye, MedalStar, People, StatusUp } from 'iconsax-reactjs';

import StatsCard from '@/components/general-components/states-card';
import { ChartConfig } from '@/components/ui/chart';

import DashboardMainCard from './dashboard-main-card';
import VisitsChart from './visits-chart';
import CampaignsBars from './campaigns-bars';

const DashboardComponents = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Top Stats Cards */}
      <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
        <StatsCard
          icon={<People variant="Bold" />}
          title="400"
          subtitle="إجمالي المؤثرين المضافين"
          color="#EE9519"
        />
        <StatsCard
          icon={<StatusUp variant="Bold" />}
          title="620"
          subtitle="عدد الحملات النشطة والمنتهية"
          color="#0054F0"
        />
        <StatsCard
          icon={<MedalStar variant="Bold" />}
          title="160"
          subtitle="عدد العلامات التجارية المسجلة"
          color="#931AE3"
        />
        <StatsCard
          icon={<Eye variant="Bold" />}
          title="3200"
          subtitle="إجمالي عدد الزيارات"
          color="#35BC94"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <DashboardMainCard
            title="المؤثرين"
            subtitle="عدد زيارات المؤثرين المسجلة خلال العام"
            firstNumber="80 مؤثر نشط"
            secondNumber="320 مؤثر غير نشط"
            data={chartData1}
            chartConfig={chartConfig1}
          />
          <VisitsChart chartData={chartData} chartConfig={chartConfig} />
        </div>

        <div className="flex flex-col gap-5">
          <CampaignsBars
            chartData={chartDataBar}
            chartConfig={chartConfigBar}
          />
          <DashboardMainCard
            title="العلامات التجارية"
            subtitle="عدد زيارات المؤثرين المسجلة خلال العام"
            firstNumber="130 علامة تجارية نشطة"
            secondNumber="30 علامة تجارية غير نشطة"
            data={chartData2}
            chartConfig={chartConfig2}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponents;

// chartData & chartConfig (unchanged)
const chartData1 = [
  { browser: 'active', data: 80, fill: 'var(--color-active)' },
  { browser: 'inactive', data: 320, fill: 'var(--color-inactive)' },
];

const chartData2 = [
  { browser: 'active', data: 130, fill: 'var(--color-active)' },
  { browser: 'inactive', data: 30, fill: 'var(--color-inactive)' },
];

const chartConfig1 = {
  influencers: {
    label: 'المؤثرين',
  },
  active: {
    label: 'نشط',
    color: 'var(--main-400)',
  },
  inactive: {
    label: 'غير نشط',
    color: '#1DA1F221',
  },
} satisfies ChartConfig;

const chartConfig2 = {
  influencers: {
    label: 'العلامات التجارية',
  },
  active: {
    label: 'علامة تجارية نشطة',
    color: 'var(--main-200)',
  },
  inactive: {
    label: 'علامة تجارية غير نشطة',
    color: '#1DA1F221',
  },
} satisfies ChartConfig;

const chartData = [
  { month: 'يناير', visits: 186 },
  { month: 'فبراير', visits: 305 },
  { month: 'مارس', visits: 237 },
  { month: 'أبريل', visits: 73 },
  { month: 'مايو', visits: 209 },
  { month: 'يونيو', visits: 214 },
  { month: 'يوليو', visits: 1000 },
  { month: 'أغسطس', visits: 120 },
  { month: 'سبتمبر', visits: 150 },
  { month: 'أكتوبر', visits: 180 },
  { month: 'نوفمبر', visits: 210 },
  { month: 'ديسمبر', visits: 240 },
].reverse();

const chartConfig = {
  visits: {
    label: 'الزيارات',
    color: 'var(--main-200)',
  },
} satisfies ChartConfig;

const chartDataBar = [
  { month: 'يناير', active: 186, inactive: 50 },
  { month: 'فبراير', active: 305, inactive: 80 },
  { month: 'مارس', active: 237, inactive: 100 },
  { month: 'أبريل', active: 73, inactive: 60 },
  { month: 'مايو', active: 209, inactive: 70 },
  { month: 'يونيو', active: 214, inactive: 40 },
  { month: 'يوليو', active: 500, inactive: 120 },
  { month: 'أغسطس', active: 120, inactive: 30 },
  { month: 'سبتمبر', active: 150, inactive: 40 },
  { month: 'أكتوبر', active: 180, inactive: 90 },
  { month: 'نوفمبر', active: 210, inactive: 100 },
  { month: 'ديسمبر', active: 240, inactive: 110 },
].reverse();

const chartConfigBar = {
  active: {
    label: 'الحملات النشطة',
    color: 'var(--main-300)',
  },
  inactive: {
    label: 'الحملات الغير نشطة',
    color: 'var(--main-100)',
  },
} satisfies ChartConfig;
