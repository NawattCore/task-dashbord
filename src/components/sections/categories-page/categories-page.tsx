'use client';

import React from 'react';
import { Add, SearchNormal1 } from 'iconsax-reactjs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TitlePage from '@/components/general-components/title-page';
import MainCategoriesTable from '@/components/tables/categories-tables/main-categories-table';

const CategoriesPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap">
        <TitlePage title="التصنيفات" showBackArrow={false} />{' '}
        <div className="md:flex grid grid-cols-2 items-center gap-4  flex-wrap  max-md:justify-between max-lg:gap-4 ">
          <div className="relative max-md:w-full col-span-2">
            <Input
              type="text"
              className="pr-14 rounded-3xl w-[448px] max-md:w-full  max-md:text-sm"
              placeholder="ابحث باسم التصنيف"
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
            إضافة تصنيف
          </Button>
        </div>
      </div>
      <MainCategoriesTable />
    </div>
  );
};

export default CategoriesPage;
