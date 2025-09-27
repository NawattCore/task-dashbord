'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Edit2, Trash } from 'iconsax-reactjs';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useOpenSidebar } from '@/context/use-open-sidebar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { srcs } from '@/config/scrs';
import { Button } from '@/components/ui/button';
import PopupComponent from '@/components/general-components/Popup-component';
import { formatFollowersCount } from '@/lib/helper';

import InfluencersTableFilter from './influencers-filter';

interface Influencer {
  id: string;
  status: 'active' | 'inactive' | 'pending';
  influencerImage: string;
  influencerName: string;
  followersNo: string;
  country: string;
  city: string;
  categories: string[];
  [key: string]: unknown;
}

export default function MainInfluencersTable() {
  const [filters, setFilters] = useState({
    status: '',
    country: [] as string[],
    city: [] as string[],
    category: [] as string[],
    followersNoFrom: '',
    followersNoTo: '',
    sorting: '',
  });
  const [deleteinfluencerPopup, setDeleteinfluencerPopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'العتيبي عبدالله',
      followersNo: '1000000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '2',
      influencerImage: srcs.logo,
      status: 'inactive',
      influencerName: 'العتيبي عبدالله',
      followersNo: '5000000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '3',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'العتيبي عبدالله',
      followersNo: '200000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '4',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'الأحمد محمد',
      followersNo: '350000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '5',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'السعيد فايز',
      followersNo: '150000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '6',
      influencerImage: srcs.logo,
      status: 'inactive',
      influencerName: 'الخالد سارة',
      followersNo: '250000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '7',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'الزهراني أحمد',
      followersNo: '800000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '8',
      influencerImage: srcs.logo,
      status: 'inactive',
      influencerName: 'القحطاني نورا',
      followersNo: '5005000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '9',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'الحربي يوسف',
      followersNo: '3005000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '10',
      influencerImage: srcs.logo,
      status: 'inactive',
      influencerName: 'العنزي لينا',
      followersNo: '2005000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '11',
      influencerImage: srcs.logo,
      status: 'active',
      influencerName: 'الشمري خالد',
      followersNo: '1005000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
    {
      id: '12',
      influencerImage: srcs.logo,
      status: 'pending',
      influencerName: 'الدوسري مريم',
      followersNo: '6005000',
      country: 'السعودية',
      city: 'الرياض',
      categories: ['الصحة', 'الجمال', 'التغذية'],
    },
  ]);

  const columns: SimpleColumn<Influencer>[] = [
    {
      key: 'influencerImage',
      header: 'صورة المؤثر',
      size: 120,
      render: value => (
        <div className="flex items-center justify-center gap-1">
          <Image src={value as string} width={20} height={20} alt="Image" />
        </div>
      ),
    },
    {
      key: 'influencerName',
      header: 'اسم المؤثر بالكامل',
      render: value => (
        <p className="underline cursor-pointer underline-offset-2">
          {value as string}
        </p>
      ),
      size: 150,
    },
    {
      key: 'followersNo',
      header: (
        <Tooltip>
          <TooltipTrigger>عدد المتابعين</TooltipTrigger>
          <TooltipContent className="p-3" side="bottom">
            <p>إجمالي عدد المتابعين عبر جميع المنصات.</p>
          </TooltipContent>
        </Tooltip>
      ),
      render: value => (
        <div className="flex items-center justify-center gap-1">
          <p>{formatFollowersCount(value as string)} متابع</p>
        </div>
      ),
      size: 200,
    },
    {
      key: 'status',
      header: 'الحالة',
      size: 120,
      render: value => (
        <div className="flex items-center justify-center">
          <span
            className={`min-w-[115px] flex items-center justify-center gap-1.5 px-1 lg:py-px py-1.5  rounded-full text-lg max-md:text-sm ${
              value === 'active'
                ? 'bg-main-green/15 text-main-green'
                : value === 'inactive'
                  ? 'bg-[#9CA3AF]/15 text-[#9CA3AF]'
                  : 'bg-[#FACC1526] text-[#FACC15]'
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 block  ${
                value === 'active'
                  ? 'bg-main-green'
                  : value === 'inactive'
                    ? 'bg-[#9CA3AF]'
                    : 'bg-[#FACC15]'
              }`}
            />
            {value === 'active'
              ? 'نشط'
              : value === 'inactive'
                ? 'غير نشط'
                : 'في الانتظار'}
          </span>
        </div>
      ),
    },
    {
      key: 'country',
      header: 'الدولة',
      size: 120,
    },
    {
      key: 'city',
      header: 'المدينة',
      size: 120,
    },
    {
      key: 'categories',
      header: 'التصنيفات',
      render: value => (
        <p className="text-wrap break-words text-main-200">
          {(value as string[]).map(category => `#${category}`).join(' ')}
        </p>
      ),
      size: 210,
    },
    {
      key: 'id',
      header: 'الاجراءات',
      size: 150,
      render: (value, row) => (
        <div className="flex space-x-2 items-center justify-center">
          <div
            onClick={() => {
              console.log('Edit', row);
            }}
            className="bg-[#76C5F5]/15 p-2 rounded-full cursor-pointer hover:bg-[#76C5F5]/25 transition-colors"
          >
            <Edit2 size="22" color="#76C5F5" variant="Bold" />
          </div>
          <div
            onClick={() => {
              // setRowSelection(prev => ({ ...prev, [row.id]: false }));
              setDeleteinfluencerPopup(true);
            }}
            className="bg-[#FF3F43]/15 p-2 rounded-full cursor-pointer hover:bg-[#FF3F43]/25 transition-colors"
          >
            <Trash size="22" color="#FF3F43" variant="Bold" />
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    console.log('rowSelection rowSelection', rowSelection);
  }, [rowSelection]);

  return (
    <div>
      <SimpleTable<Influencer>
        customHeader={true}
        data={influencers}
        columns={columns}
        searchable={false} // Disable search
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pagination={pagination}
        onPaginationChange={setPagination}
        selectable={true}
        bulkSelect={true}
        onSelectionChange={selected => {
          console.log('Selected influencers:', selected);
        }}
        styles={{
          container: 'rounded-xl border-[#FFFFFF1A] border',
          table: `border-t-0 rounded-tl-0 rounded-tr-0 text-center bg-[var(--main-container)] transition-all duration-300 ${isSidebarOpen ? 'lg:w-[calc(100dvw-360px)] w-[calc(100dvw-40px)]' : 'lg:w-[calc(100dvw-145px)] w-[calc(100dvw-40px)]'}`,
          header:
            'bg-[var(--main-container)] !text-center [&_tr]:border-b-0 hover:!bg-transparent',
          headerCell:
            'text-[var(--color-main-mute)] !text-center hover:!bg-transparent text-base',
          row: 'transition-all duration-200 align-middle [&:nth-child(odd)]:bg-[var(--main-bg)] border-b-0 [&:nth-child(even)]:bg-[var(--main-container)]',
          cell: 'text-white !text-center text-lg py-3 max-md:text-sm',
          selectedRow: '',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={true}
      >
        <div className="flex justify-between items-center px-4 py-4 flex-wrap gap-5">
          {/* Title Section */}
          <div className="text-white text-2xl max-md:text-lg">
            جميع المؤثرين{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({influencers.length}/129)
            </span>
          </div>
          {Object.keys(rowSelection).length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={'main_outline_destructive'}
                className=" rounded-3xl max-sm:px-3"
                onClick={() => setDeleteinfluencerPopup(true)}
              >
                <Trash
                  color="#FF3F43"
                  variant="Bold"
                  className="size-6 max-md:size-5"
                />
                <div>
                  حذف المحدد
                  <span className="mr-1">
                    ({Object.keys(rowSelection).length})
                  </span>
                </div>
              </Button>
            </div>
          ) : (
            <InfluencersTableFilter filters={filters} setFilters={setFilters} />
          )}
        </div>
        <PopupComponent
          isOpen={deleteinfluencerPopup}
          onClose={() => setDeleteinfluencerPopup(false)}
          type="success"
          mode="action"
          icon={
            <Image
              src={srcs.AlertDelete}
              alt="AlertDelete"
              width={150}
              height={150}
              className="lg:w-[143px] lg:h-[120px] w-[100px] h-[80px]"
            />
          }
          title="هل أنت متأكد من حذف المؤثر؟"
          subtitle="إذا قمت بحذف المؤثر لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => {
              console.log('Retrying...');
            },
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Cancelled'),
          }}
        />
        <PopupComponent
          isOpen={false}
          onClose={() => console.log('SuccessSign')}
          type="success"
          mode="viewinfo"
          icon={
            <Image
              src={srcs.SuccessSign}
              alt="SuccessSign"
              width={150}
              height={150}
              className="lg:w-[150px] lg:h-[150px] w-[100px] h-[100px]"
            />
          }
          title="تم حذف المؤثر بنجاح!"
          subtitle="تم حذف المؤثر بنجاح"
        />
      </SimpleTable>
    </div>
  );
}
