'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Edit2, Trash } from 'iconsax-reactjs';

import { useOpenSidebar } from '@/context/use-open-sidebar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import PopupComponent from '@/components/general-components/Popup-component';
import { srcs } from '@/config/scrs';

import MainCategoriesTableFilter from './categories-filter';

interface Category {
  id: string;
  name: string;
  campaigns: number;
  trademarks: number;
  influencers: number;
  status: 'active' | 'inactive';
}

export default function MainCategoriesTable() {
  const [filters, setFilters] = useState({
    status: '',
    sorting: '',
    influencersNoFrom: '',
    influencersNoTo: '',
    campaignsNoFrom: '',
    campaignsNoTo: '',
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [categories] = useState<Category[]>([
    {
      id: '1',
      name: 'العناية والجمال',
      campaigns: 13,
      trademarks: 13,
      influencers: 150,
      status: 'active',
    },
    {
      id: '2',
      name: 'تقنية',
      campaigns: 8,
      trademarks: 7,
      influencers: 120,
      status: 'inactive',
    },
    {
      id: '3',
      name: 'أزياء',
      campaigns: 21,
      trademarks: 9,
      influencers: 200,
      status: 'active',
    },
    {
      id: '4',
      name: 'رياضة',
      campaigns: 5,
      trademarks: 6,
      influencers: 90,
      status: 'inactive',
    },
    {
      id: '5',
      name: 'مأكولات',
      campaigns: 14,
      trademarks: 11,
      influencers: 170,
      status: 'active',
    },
    {
      id: '6',
      name: 'سفر',
      campaigns: 9,
      trademarks: 8,
      influencers: 130,
      status: 'inactive',
    },
    {
      id: '7',
      name: 'تعليم',
      campaigns: 11,
      trademarks: 10,
      influencers: 140,
      status: 'active',
    },
    {
      id: '8',
      name: 'صحة',
      campaigns: 7,
      trademarks: 5,
      influencers: 100,
      status: 'inactive',
    },
    {
      id: '9',
      name: 'عقارات',
      campaigns: 16,
      trademarks: 12,
      influencers: 180,
      status: 'active',
    },
    {
      id: '10',
      name: 'ترفيه',
      campaigns: 6,
      trademarks: 4,
      influencers: 95,
      status: 'inactive',
    },
    {
      id: '11',
      name: 'ألعاب',
      campaigns: 18,
      trademarks: 13,
      influencers: 190,
      status: 'active',
    },
    {
      id: '12',
      name: 'أمومة',
      campaigns: 10,
      trademarks: 9,
      influencers: 145,
      status: 'inactive',
    },
  ]);

  const columns: SimpleColumn<Category>[] = [
    {
      key: 'name',
      header: 'اسم التصنيف',
      render(value) {
        return (
          <div className="flex items-center justify-center">
            <p className="underline cursor-pointer underline-offset-2">
              {value as string}
            </p>
          </div>
        );
      },
      size: 200,
    },
    {
      key: 'trademarks',
      header: 'عدد العلامات التجارية',
      size: 200,
      render: val => `${val} علامة تجارية`,
    },
    {
      key: 'campaigns',
      header: 'عدد الحملات',
      size: 160,
      render: val => `${val} حملة`,
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
      key: 'influencers',
      header: 'عدد المؤثرين',
      size: 160,
      render: val => `${val} مؤثر`,
    },
    {
      key: 'id',
      header: 'الإجراءات',
      size: 150,
      render: (_, row) => (
        <div className="flex items-center justify-center gap-3">
          <div
            onClick={() => console.log('Edit', row)}
            className="bg-[#76C5F5]/15 p-2 rounded-full cursor-pointer hover:bg-[#76C5F5]/25"
          >
            <Edit2 size="20" color="#76C5F5" variant="Bold" />
          </div>
          <div
            onClick={() => setDeletePopup(true)}
            className="bg-[#FF3F43]/15 p-2 rounded-full cursor-pointer hover:bg-[#FF3F43]/25"
          >
            <Trash size="20" color="#FF3F43" variant="Bold" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log('rowSelection', rowSelection);
  }, [rowSelection]);

  return (
    <div>
      <SimpleTable<Category>
        customHeader={true}
        data={categories}
        columns={columns}
        searchable={false}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pagination={pagination}
        onPaginationChange={setPagination}
        selectable={true}
        bulkSelect={true}
        styles={{
          container: 'rounded-xl border-[#FFFFFF1A] border',
          table: `border-t-0 rounded-tl-0 rounded-tr-0 text-center bg-[var(--main-container)] transition-all duration-300 ${
            isSidebarOpen
              ? 'lg:w-[calc(100dvw-360px)] w-[calc(100dvw-40px)]'
              : 'lg:w-[calc(100dvw-145px)] w-[calc(100dvw-40px)]'
          }`,
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
          <div className="text-white text-2xl max-md:text-lg">
            جميع التصنيفات{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({categories.length}/160)
            </span>
          </div>
          {Object.keys(rowSelection).length > 0 ? (
            <Button
              variant="main_outline_destructive"
              className="rounded-3xl flex items-center gap-2"
              onClick={() => setDeletePopup(true)}
            >
              <Trash
                color="#FF3F43"
                variant="Bold"
                className="size-6 max-md:size-5"
              />
              حذف المحدد ({Object.keys(rowSelection).length})
            </Button>
          ) : (
            <MainCategoriesTableFilter
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </div>

        <PopupComponent
          isOpen={deletePopup}
          onClose={() => setDeletePopup(false)}
          type="success"
          mode="action"
          icon={
            <Image
              src={srcs.AlertDelete}
              alt="AlertDelete"
              width={120}
              height={120}
            />
          }
          title="هل أنت متأكد من حذف التصنيف؟"
          subtitle="إذا قمت بحذف التصنيف لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => setDeletePopup(false),
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Category deleted'),
          }}
        />
      </SimpleTable>
    </div>
  );
}
