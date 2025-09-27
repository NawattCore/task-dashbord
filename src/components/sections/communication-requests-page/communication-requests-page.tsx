'use client';

import React from 'react';
import { SearchNormal1 } from 'iconsax-reactjs';

import { Input } from '@/components/ui/input';
import TitlePage from '@/components/general-components/title-page';
import MainCommunicationRequestsTable from '@/components/tables/communication-requests-tables/main-communication-requests-table';

const CommunicationRequestsPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap">
        <TitlePage title="طلبات التواصل" showBackArrow={false} />{' '}
        <div className="md:flex grid grid-cols-2 items-center gap-4  flex-wrap  max-md:justify-between max-lg:gap-4 ">
          <div className="relative max-lg:w-full col-span-2">
            <Input
              type="text"
              className="pr-14 rounded-3xl w-[648px] max-lg:w-full  max-lg:text-sm"
              placeholder="ابحث بالاسم , البريد الالكتروني , رقم الهاتف"
            />
            <SearchNormal1
              color="#fff"
              className="absolute top-1/2 -translate-y-1/2 right-4.5 text-lg text-white size-5"
            />
          </div>
        </div>
      </div>
      <MainCommunicationRequestsTable />
    </div>
  );
};

export default CommunicationRequestsPage;
