'use client';
import React from 'react';
import { DocumentText1, ProfileAdd, UserEdit } from 'iconsax-reactjs';
import { useRouter } from 'next/navigation';

import TitlePage from '@/components/general-components/title-page';
import TabsWraper from '@/components/general-components/tabs-wraper';
import AddBrandForm from '@/components/forms/brands-management-forms/add-brand-form';
import InfluencersAttachedWithBrand from '@/components/tables/brand-management-tables/edit-brands/influencers-attached-with-brand';
import AddInfluencersTable from '@/components/tables/brand-management-tables/edit-brands/add-influncers-table';

export interface TabItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function EditBrandPage({ id }: { id: string }) {
  const tabsData: TabItem[] = [
    {
      label: 'بيانات الحساب',
      value: 'account',
      icon: (
        <UserEdit size="32" color="#fff" className="size-6 max-md:size-5" />
      ),
      content: <AddBrandForm brandId={id} />,
    },
    {
      label: 'تفاصيل المؤثرين ',
      value: 'create-influencers',
      icon: (
        <DocumentText1
          size="32"
          color="#fff"
          className="size-6 max-md:size-5"
        />
      ),
      content: <InfluencersAttachedWithBrand />,
    },
    {
      label: ' إضافة مؤثرين',
      value: 'create-add-influencers',
      icon: (
        <ProfileAdd size="32" color="#fff" className="size-6 max-md:size-5" />
      ),
      content: <AddInfluencersTable />,
    },
  ];
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 max-lg:gap-2  h-full ">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap max-lg:p-1">
        <TitlePage
          title="تعديل علامة تجارية"
          showBackArrow={true}
          onBackClick={() => router.back()}
        />
      </div>

      {/* {Main container of brand Deatails } */}
      <TabsWraper
        tabsData={tabsData}
        title="تعديل علامة تجارية"
        subtitle="الحملات التي تم إطلاقها في العام الحالي "
      />
    </div>
  );
}
