'use client';

import React from 'react';
import {
  Add,
  Clock,
  ProfileDelete,
  ProfileTick,
  SearchNormal1,
  StatusUp,
  TickCircle,
} from 'iconsax-reactjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StatsCard from '@/components/general-components/states-card';
import TitlePage from '@/components/general-components/title-page';
import MainCampaignsTable from '@/components/tables/campaigns-tables/main-campaigns-table';

const CampaignsPage = () => {
  const statcardDetails = [
    {
      icon: <StatusUp variant="Bold" />,
      title: '620',
      subtitle: 'إجمالي عدد الحملات',
      color: '#0054F0',
    },
    {
      icon: <ProfileTick variant="Bold" />,
      title: '80',
      subtitle: 'عدد الحملات النشطة',
      color: '#46D55B',
    },
    {
      icon: <TickCircle variant="Bold" />,
      title: '320',
      subtitle: 'عدد الحملات المكتملة',
      color: '#3B82F6',
    },
    {
      icon: <Clock variant="Bold" />,
      title: '320',
      subtitle: 'عدد الحملات المعلقة',
      color: '#FACC15',
    },
    {
      icon: <ProfileDelete variant="Bold" />,
      title: '320',
      subtitle: 'عدد الحملات الملغاة',
      color: '#FF3F43',
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap">
        <TitlePage title="الحملات الإعلانية" showBackArrow={false} />{' '}
        <div className="md:flex grid grid-cols-2 items-center gap-4  flex-wrap  max-md:justify-between max-lg:gap-4 ">
          <div className="relative max-md:w-full col-span-2">
            <Input
              type="text"
              className="pr-14 rounded-3xl w-[448px] max-md:w-full  max-md:text-sm"
              placeholder="ابحث باسم الحملة , العلامة التجارية , الشركة"
            />
            <SearchNormal1
              color="#fff"
              className="absolute top-1/2 -translate-y-1/2 right-4.5 text-lg text-white size-5"
            />
          </div>
          <Button
            variant={'main'}
            className="max-md:w-full rounded-3xl col-span-2 px-16"
          >
            <Add size="32" color="#fff" className="size-6 max-md:size-5" />
            إضافة حملة
          </Button>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-5  md:grid-cols-3 grid-cols-2 md:gap-5 gap-2">
        {statcardDetails.map((card, index) => (
          <StatsCard
            key={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            color={card.color}
            className="last:max-md:col-span-2"
          />
        ))}
      </div>
      <MainCampaignsTable />
    </div>
  );
};

export default CampaignsPage;
