'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabItem } from '@/app/(dashboard)/brand/[id]/page';
import { useOpenSidebar } from '@/context/use-open-sidebar';
const TabsWraper = ({
  tabsData,
  title,
  subtitle,
}: {
  tabsData: TabItem[];
  title: string;
  subtitle: string;
}) => {
  const { isSidebarOpen } = useOpenSidebar();
  const pathname = usePathname();
  return (
    <Tabs
      orientation="vertical"
      defaultValue="account"
      dir="rtl"
      className={`${isSidebarOpen ? 'lg:w-[calc(100dvw-360px)] w-[calc(100dvw-40px)]' : 'lg:w-[calc(100dvw-145px)] w-[calc(100dvw-40px)]'}`}
    >
      <div
        className={`w-full grid  grid-cols-8 gap-4 justify-center bg-main-container p-8 rounded-2xl h-full grid-flow-dense  max-[1200px]:p-2 overflow-auto ${isSidebarOpen ? 'max-[1400px]:flex  max-[1400px]:flex-col-reverse' : 'max-[1200px]:flex  max-[1200px]:flex-col-reverse'}`}
        dir="ltr"
      >
        {/* المحتوى */}
        <div className="h-full col-span-6 w-full bg-main-bg rounded-2xl p-8 max-[1200px]:col-span-8 max-[1200px]:p-5">
          {tabsData.map(tab => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex  justify-center h-full w-full overflow-auto  "
            >
              {tab.content}
            </TabsContent>
          ))}
        </div>

        {/* التابات */}
        <div
          className={`h-full border-l border-[#FFFFFF1A] w-full col-span-2 max-[1200px]:col-span-8  max-[1200px]:h-fit  max-[1200px]:py-4 max-[1200px]:px-2 ${isSidebarOpen ? 'max-[1400px]:border-none' : 'max-[1200px]:border-none'}`}
        >
          <div className="flex flex-col gap-2 items-end mb-12 max-[1200px]:mb-4 text-right max-[1200px]:px-2  ">
            <div className="text-xl text-white font-bold  max-md:text-[16px]">
              {title}
            </div>
            <div className="text-sm text-main-mute  max-md:text-sm">
              {subtitle}
            </div>
          </div>
          <TabsList
            dir="rtl"
            className={`shrink-0 grid grid-cols-1  h-fit w-full gap-1 bg-transparent pl-5 max-[1200px]:pl-0 ${isSidebarOpen ? 'max-[1400px]:grid-cols-2' : 'max-[1200px]:grid-cols-2'}`}
          >
            {tabsData.map(tab => (
              <TabsTrigger
                disabled={
                  pathname == '/brand/add-brand' &&
                  (tab.value === 'create-influencers' ||
                    tab.value === 'create-add-influencers')
                }
                key={tab.value}
                value={tab.value}
                className="py-3 px-4 max-[1200px]:px-2 w-full  justify-end rounded-4xl data-[state=active]:bg-main-bg !text-white cursor-pointer max-[1200px]:p-3 truncate "
              >
                <div className="flex items-center space-x-reverse gap-3 max-[1200px]:gap-1 w-full justify-start">
                  <div className="flex items-center justify-center">
                    {tab.icon}
                  </div>
                  <span className="text-base max-[1200px]:text-sm font-medium">
                    {tab.label}
                  </span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
};

export default TabsWraper;
