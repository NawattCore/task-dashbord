'use client';
import React from 'react';
import { Clock, Edit2, Smileys, Star, StatusUp, Trash } from 'iconsax-reactjs';
import { useRouter } from 'next/navigation';

import TitlePage from '@/components/general-components/title-page';
import { Button } from '@/components/ui/button';
import TabsWraper from '@/components/general-components/tabs-wraper';
import InfoOfBrand from '@/components/sections/brands-management/brand-details/info-of-brand';
import InfluencersTable from '@/components/tables/brand-management-tables/brand-influencers-table';
import HistoryInfluencerTable from '@/components/tables/brand-management-tables/history-infuencer-table';
import AdsCampInfluencerTable from '@/components/tables/brand-management-tables/ads-camp-influencer-table';
// interface PageProps {
//   params: {
//     id: string;
//   };
// }
export interface TabItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}
const tabsData: TabItem[] = [
  {
    label: 'بيانات العملة التجارية',
    value: 'account',
    icon: (
      <Star
        size="32"
        color="#fff"
        className="size-6 max-md:size-5 max-md:!w-4 max-md:!h-4"
      />
    ),
    content: <InfoOfBrand />,
  },
  {
    label: ' تفاصيل المؤثرين',
    value: 'password',
    icon: (
      <Smileys
        size="32"
        color="#fff"
        className="size-6 max-md:size-5 max-md:!w-4 max-md:!h-4"
      />
    ),
    content: <InfluencersTable />,
  },
  {
    label: 'سجل النشاط',
    value: 'activity',
    icon: (
      <Clock
        size="32"
        color="#fff"
        className="size-6 max-md:size-5 max-md:!w-4 max-md:!h-4"
      />
    ),
    content: <HistoryInfluencerTable />,
  },
  {
    label: 'الحملات الإعلانية',
    value: 'campaigns',
    icon: (
      <StatusUp
        size="32"
        color="#fff"
        className="size-6 max-md:size-5 max-md:!w-4 max-md:!h-4"
      />
    ),
    content: <AdsCampInfluencerTable />,
  },
];

export default function DetailsBrand() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 max-lg:gap-2  h-full ">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap max-lg:p-1 items-start">
        <TitlePage
          title="محتوى العلامة التجارية"
          showBackArrow={true}
          onBackClick={() => router.back()}
        />
        <div className="md:flex grid grid-cols-2 items-center gap-4  flex-wrap  max-md:justify-between max-lg:gap-4 w-full">
          <Button
            variant={'main_outline_light'}
            className=" rounded-3xl max-md:col-span-2 "
          >
            <Edit2
              color="#76C5F5"
              variant="Bold"
              className="size-6 max-md:size-5"
            />
            <div className="text-lg max-md:text-sm ">
              تعديل بيانات العلامة التجارية
            </div>
          </Button>
          <Button
            variant={'main_outline_destructive'}
            className=" rounded-3xl max-md:col-span-2 "
            // onClick={() => setDeleteBrandPopup(true)}
          >
            <Trash
              color="#FF3F43"
              variant="Bold"
              className="size-6 max-md:size-5"
            />
            <div className="text-lg max-md:text-sm">حذف العلامة التجارية</div>
          </Button>
        </div>
      </div>

      {/* {Main container of brand Deatails } */}
      <TabsWraper
        tabsData={tabsData}
        title="تفاصيل العلامة التجارية"
        subtitle="الحملات التي تم إطلاقها في العام الحالي"
      />
    </div>
  );
}
