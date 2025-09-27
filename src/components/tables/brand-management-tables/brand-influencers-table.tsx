'use client';

import { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { SearchNormal1 } from 'iconsax-reactjs';
import Image from 'next/image';

import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Input } from '@/components/ui/input';
import { srcs } from '@/config/scrs';

import { SortingFilter } from '../common-filters';

interface Influencer {
  id: string;
  name: string;
  username: string;
  platforms: {
    youtube?: boolean;
    instagram?: boolean;
    snapchat?: boolean;
    facebook?: boolean;
    tiktok?: boolean;
  };
  followersCount: string;
  classification: 'فاشيون' | 'تقني' | 'طبخ' | 'رياضة' | 'سفر';
  profileImage: string;
  [key: string]: unknown;
}

// Social Media Icons Component
const SocialMediaIcons = ({
  platforms,
}: {
  platforms: Influencer['platforms'];
}) => {
  return (
    <div className="flex items-center justify-center   gap-1 flex-wrap">
      {platforms.youtube && (
        <Image src={srcs.youtube} alt="youtube" width={32} height={32} />
      )}
      {platforms.instagram && (
        <Image src={srcs.instagram} alt="instagram" width={32} height={32} />
      )}
      {platforms.snapchat && (
        <Image src={srcs.snapchat} alt="snapchat" width={32} height={32} />
      )}
      {platforms.facebook && (
        <Image src={srcs.facebook} alt="facebook" width={32} height={32} />
      )}
      {platforms.tiktok && (
        <Image src={srcs.tiktok} alt="tiktok" width={32} height={32} />
      )}
    </div>
  );
};

export default function InfluencersTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selected, setSelected] = useState({
    sorting: '',
  });

  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'كريم عبد الله',
      username: '@karimabdullah',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '500 ألف متابع',
      classification: 'فاشيون',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '2',
      name: 'سارة أحمد',
      username: '@sarah_ahmed',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: false,
        facebook: true,
        tiktok: true,
      },
      followersCount: '750 ألف متابع',
      classification: 'طبخ',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '3',
      name: 'محمد الخالد',
      username: '@mohammed_k',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: true,
        facebook: false,
        tiktok: true,
      },
      followersCount: '1.2 مليون متابع',
      classification: 'تقني',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '4',
      name: 'نورا السعيد',
      username: '@nora_happy',
      platforms: {
        youtube: false,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '300 ألف متابع',
      classification: 'سفر',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '5',
      name: 'أحمد الزهراني',
      username: '@ahmed_z',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: false,
        facebook: false,
        tiktok: true,
      },
      followersCount: '900 ألف متابع',
      classification: 'رياضة',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '6',
      name: 'فاطمة الحربي',
      username: '@fatma_harbi',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: false,
      },
      followersCount: '650 ألف متابع',
      classification: 'فاشيون',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '7',
      name: 'عبدالله النجار',
      username: '@abdullah_najjar',
      platforms: {
        youtube: true,
        instagram: true,
        snapchat: false,
        facebook: true,
        tiktok: true,
      },
      followersCount: '1.5 مليون متابع',
      classification: 'تقني',
      profileImage: '/api/placeholder/40/40',
    },
    {
      id: '8',
      name: 'ريما الخالد',
      username: '@rima_khalid',
      platforms: {
        youtube: false,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '420 ألف متابع',
      classification: 'طبخ',
      profileImage: '/api/placeholder/40/40',
    },

    {
      id: '9',
      name: 'ريما الخالد',
      username: '@rima_khalid',
      platforms: {
        youtube: false,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '420 ألف متابع',
      classification: 'طبخ',
      profileImage: '/api/placeholder/40/40',
    },

    {
      id: '10',
      name: 'ريما الخالد',
      username: '@rima_khalid',
      platforms: {
        youtube: false,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '420 ألف متابع',
      classification: 'طبخ',
      profileImage: '/api/placeholder/40/40',
    },

    {
      id: '11',
      name: 'ريما الخالد',
      username: '@rima_khalid',
      platforms: {
        youtube: false,
        instagram: true,
        snapchat: true,
        facebook: true,
        tiktok: true,
      },
      followersCount: '420 ألف متابع',
      classification: 'طبخ',
      profileImage: '/api/placeholder/40/40',
    },
  ]);

  const columns: SimpleColumn<Influencer>[] = [
    {
      key: 'profileImage',
      header: 'صورة المؤثر',
      size: 100,
      render: (value, row) => (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm bg-white/90">
            {row.name.charAt(0)}
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      header: 'اسم المؤثر',
      size: 100,
      render: (value, row) => row.name,
    },
    {
      key: 'followersCount',
      header: 'عدد المتابعين',
      size: 100,
    },
    {
      key: 'platforms',
      header: 'المنصات',
      size: 180,
      render: (value, row) => <SocialMediaIcons platforms={row.platforms} />,
    },

    {
      key: 'classification',
      header: 'التصنيف',
      size: 100,
      render: (value, row) => row.classification,
    },
  ];
  const sortingOptions = {
    label: 'ترتيب حسب الاسم',
    values: [
      {
        value: 'asc',
        label: 'A - Z',
        textColor: 'text-white',
      },
      {
        value: 'desc',
        label: 'Z - A',
        textColor: 'text-white',
      },
    ],
  };

  useEffect(() => {
    console.log('rowSelection rowSelection', rowSelection);
  }, [rowSelection]);

  return (
    <div className="w-full  h-full overflow-auto">
      <SimpleTable<Influencer>
        emptyMessage="لا يوجد مؤثرات"
        customHeader={true}
        data={influencers}
        columns={columns}
        searchable={false}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        paginated={false}
        selectable={false}
        bulkSelect={true}
        onSelectionChange={selected => {
          console.log('Selected influencers:', selected);
        }}
        styles={{
          mainTable: 'border-separate border-spacing-y-4',
          container: 'rounded-2xl h-full',
          table: `border-0 rounded-2xl text-center transition-all duration-300  w-full h-[450px] overflow-auto pl-4 `,
          header: 'border- border-[#FFFFFF1A] !text-center',
          headerRow: 'border-0 !rounded-none hover:bg-transparent',
          headerCell:
            'text-main-mute text-lg border-b border-[#FFFFFF1A] border-t first:border-r last:border-l py-4 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl text-[16px] font-medium max-md:text-sm',
          body: 'divide-y-0',
          row: ' bg-main-container rounded-2xl',
          cell: 'text-white !text-center text-lg py-4 max-md:text-sm border-0 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl max-md:text-sm',
          selectedRow: 'bg-blue-900/20 border-l-4 border-l-blue-500',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={false}
      >
        <div className="flex justify-between items-center flex-wrap gap-5 border-gray-700/50 rounded-t-2xl">
          {/* Title Section */}
          <div className="flex flex-col gap-2 items-start  max-lg:mb-4 text-right flex-1">
            <div className="text-xl text-white font-medium  max-md:text-[16px] ">
              {' '}
              تفاصيل المؤثرين
            </div>
            <div className="text-sm text-main-mute font-light max-md:text-xs ">
              الحملات التي تم إطلاقها في العام الحالي
            </div>
          </div>

          {/* Search Section */}
          <div className="relative max-md:w-full col-span-2">
            <Input
              type="text"
              className="pr-14 rounded-3xl w-[310px] max-md:w-full  max-md:text-sm "
              placeholder="ابحث باسم المستخدم "
            />
            <SearchNormal1
              color="#fff"
              className="absolute top-1/2 -translate-y-1/2 right-4.5 text-xl text-white size-5"
            />
          </div>
          <SortingFilter
            filters={selected}
            setFilters={setSelected}
            sortingOptions={sortingOptions}
          />
        </div>
      </SimpleTable>
    </div>
  );
}
