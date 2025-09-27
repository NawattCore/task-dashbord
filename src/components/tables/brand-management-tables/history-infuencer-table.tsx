'use client';

import { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { Calendar2, SearchNormal1 } from 'iconsax-reactjs';

import { Calendar } from '@/components/ui/calendar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import FilterPopover from '../filter-popover';

interface Influencer {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  visitDate: string;
  visitTime: string;
  visitLink: string;
  [key: string]: unknown;
}

export default function HistoryInfluencerTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'كريم عبد الله',
      username: '@karimabdullah',
      profileImage: '/api/placeholder/40/40',
      visitDate: '03-08-2025',
      visitTime: '10:30 AM',
      visitLink: 'https://visit.com',
    },
    {
      id: '2',
      name: 'سارة أحمد',
      username: '@sarah_ahmed',
      profileImage: '/api/placeholder/40/40',
      visitDate: '02-08-2025',
      visitTime: '09:15 AM',
      visitLink: 'https://instagram.com/sarah_ahmed',
    },
    {
      id: '3',
      name: 'محمد الخالد',
      username: '@mohammed_k',
      profileImage: '/api/placeholder/40/40',
      visitDate: '02-08-2025',
      visitTime: '09:15 AM',
      visitLink: 'https://instagram.com/sarah_ahmed',
    },
    {
      id: '3',
      name: 'محمد الخالد',
      username: '@mohammed_k',
      profileImage: '/api/placeholder/40/40',
      visitDate: '01-08-2025',
      visitTime: '02:45 PM',
      visitLink: 'https://youtube.com/mohammed_k',
    },
    {
      id: '4',
      name: 'نورا السعيد',
      username: '@nora_happy',
      profileImage: '/api/placeholder/40/40',
      visitDate: '01-08-2025',
      visitTime: '02:45 PM',
      visitLink: 'https://youtube.com/mohammed_k',
    },
    {
      id: '4',
      name: 'نورا السعيد',
      username: '@nora_happy',
      profileImage: '/api/placeholder/40/40',
      visitDate: '31-07-2025',
      visitTime: '11:20 AM',
      visitLink: 'https://tiktok.com/@nora_happy',
    },
    {
      id: '5',
      name: 'أحمد الزهراني',
      username: '@ahmed_z',
      profileImage: '/api/placeholder/40/40',
      visitDate: '30-07-2025',
      visitTime: '04:30 PM',
      visitLink: 'https://instagram.com/ahmed_z',
    },
    {
      id: '6',
      name: 'فاطمة الحربي',
      username: '@fatma_harbi',
      profileImage: '/api/placeholder/40/40',
      visitDate: '29-07-2025',
      visitTime: '08:45 AM',
      visitLink: 'https://youtube.com/fatma_harbi',
    },
    {
      id: '7',
      name: 'عبدالله النجار',
      username: '@abdullah_najjar',
      profileImage: '/api/placeholder/40/40',
      visitDate: '28-07-2025',
      visitTime: '01:15 PM',
      visitLink: 'https://youtube.com/fatma_harbi',
    },
    {
      id: '7',
      name: 'عبدالله النجار',
      username: '@abdullah_najjar',
      profileImage: '/api/placeholder/40/40',
      visitDate: '28-07-2025',
      visitTime: '01:15 PM',
      visitLink: 'https://facebook.com/abdullah.najjar',
    },
    {
      id: '8',
      name: 'ريما الخالد',
      username: '@rima_khalid',
      profileImage: '/api/placeholder/40/40',
      visitDate: '27-07-2025',
      visitTime: '07:30 AM',
      visitLink: 'https://snapchat.com/add/rima_khalid',
    },
    {
      id: '9',
      name: 'ليلى المنصوري',
      username: '@layla_mansouri',
      profileImage: '/api/placeholder/40/40',
      visitDate: '26-07-2025',
      visitTime: '03:20 PM',
      visitLink: 'https://instagram.com/layla_mansouri',
    },
    {
      id: '10',
      name: 'خالد البراك',
      username: '@khalid_albarak',
      profileImage: '/api/placeholder/40/40',
      visitDate: '25-07-2025',
      visitTime: '12:10 PM',
      visitLink: 'https://tiktok.com/@khalid_albarak',
    },
    {
      id: '11',
      name: 'مريم العتيبي',
      username: '@maryam_otaibi',
      profileImage: '/api/placeholder/40/40',
      visitDate: '24-07-2025',
      visitTime: '05:45 PM',
      visitLink: 'https://facebook.com/maryam.otaibi',
    },
  ]);

  const columns: SimpleColumn<Influencer>[] = [
    {
      key: 'visitDate',
      header: 'تاريخ الزيارة',
      size: 100,
      render: (value, row) => (
        <div className="text-center text-white ">{row.visitDate}</div>
      ),
    },
    {
      key: 'name',
      header: 'اسم المؤثر',
      size: 120,
      render: (value, row) => (
        <div className="text-center">
          <div className=" text-white ">{row.name}</div>
        </div>
      ),
    },
    {
      key: 'visitTime',
      header: 'الوقت',
      size: 120,
      render: (value, row) => (
        <div className="text-center text-white ">{row.visitTime}</div>
      ),
    },
    {
      key: 'visitLink',
      header: 'رابط التغطية',
      size: 300,
      render: (value, row) => (
        <div className="text-center">
          <a
            href={row.visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main-200 !underline "
          >
            {row.visitLink}
          </a>
        </div>
      ),
    },
  ];

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
          mainTable: 'border-separate border-spacing-y-4 ',
          container: 'rounded-2xl h-full',
          table: `border-0 rounded-2xl text-center transition-all duration-300 w-full overflow-auto lg:h-[450px] pl-4 `,
          header: 'border- border-[#FFFFFF1A] !text-center',
          headerRow: 'border-0 !rounded-none hover:bg-transparent',
          headerCell:
            'text-main-mute text-lg border-b border-[#FFFFFF1A] border-t first:border-r last:border-l py-4 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl text-[16px] font-medium max-lg:text-sm',
          body: 'divide-y-0',
          row: ' bg-main-container rounded-2xl',
          cell: 'text-white !text-center text-lg py-4 max-md:text-sm border-0 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl max-lg:text-sm',
          selectedRow: 'bg-blue-900/20 border-l-4 border-l-blue-500',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={false}
      >
        <div className="flex justify-between items-center flex-wrap gap-5 border-gray-700/50 rounded-t-2xl">
          {/* Title Section */}
          <div className="flex flex-col gap-2 items-start   max-lg:mb-4 text-right flex-1">
            <div className="text-xl text-white font-medium max-md:text-[16px]  ">
              {' '}
              سجل النشاط الخاص بالبراند
            </div>
            <div className="text-sm text-main-mute max-md:text-xs font-light ">
              نظرة تفصيلية على زيارات العلامات التجارية لصفحات المؤثرين{' '}
            </div>
          </div>

          {/* Search Section */}
          <div className="relative max-md:w-full col-span-2">
            <Input
              type="text"
              className="pr-14 rounded-3xl w-[310px] max-md:w-full  max-md:text-sm"
              placeholder="ابحث باسم المستخدم "
            />
            <SearchNormal1
              color="#fff"
              className="absolute top-1/2 -translate-y-1/2 right-4.5 text-xl text-white size-5"
            />
          </div>
          <FilterPopover
            title={
              fromDate && toDate
                ? `${fromDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })} - ${toDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}`
                : 'التاريخ'
            }
            startIcon={<Calendar2 variant="Bold" className="size-5" />}
          >
            <div className=" max-sm:w-[300px]">
              <div className="flex sm:gap-4 gap-2 flex-1">
                <Input
                  placeholder="من"
                  value={
                    fromDate
                      ? fromDate.toLocaleDateString('ar-EG', {
                          day: 'numeric',
                          month: 'long',
                        })
                      : ''
                  }
                  readOnly
                  className="rounded-lg bg-transparent"
                />
                <Input
                  placeholder="الي"
                  value={
                    toDate
                      ? toDate.toLocaleDateString('ar-EG', {
                          day: 'numeric',
                          month: 'long',
                        })
                      : ''
                  }
                  readOnly
                  className="rounded-lg bg-transparent"
                />
                <Button
                  variant="main"
                  className=" lg:text-lg text-sm bg-main-300 sm:px-5 px-10"
                >
                  تطبيق
                </Button>
              </div>

              <div className="flex justify-between overflow-auto">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  className="rounded-lg"
                />
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  className="rounded-lg"
                />
              </div>
            </div>
          </FilterPopover>
        </div>
      </SimpleTable>
    </div>
  );
}
