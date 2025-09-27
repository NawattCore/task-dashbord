'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Edit2, Eye, Trash } from 'iconsax-reactjs';

import { useOpenSidebar } from '@/context/use-open-sidebar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import PopupComponent from '@/components/general-components/Popup-component';
import { srcs } from '@/config/scrs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import MainTestimonialsTableFilter from './main-testimonials-filter';
interface Testimonial {
  id: string;
  fullName: string;
  reviewText: string;
  status: 'active' | 'inactive';
  createdAt: string;
  image: string;
}

export default function TestimonialsTable() {
  const [filters, setFilters] = useState({
    status: '',
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [testimonials] = useState<Testimonial[]>([
    {
      id: '1',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'active',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '2',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'inactive',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '3',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'active',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '4',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'active',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '5',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'inactive',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '6',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'active',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '7',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'inactive',
      createdAt: '01-03-2025',
      image: 'https://github.com/shadcn.png',
    },
    {
      id: '8',
      fullName: 'نيرة مجدي عبد الرحمن',
      reviewText: 'الخدمة كانت ممتازة جدًا وفريق العمل متجا',
      status: 'active',
      createdAt: '01-03-2025',
      image: '',
    },
  ]);

  const columns: SimpleColumn<Testimonial>[] = [
    {
      key: 'image',
      header: 'صورة العميل',
      size: 100,
      render: (value, row) => (
        <Avatar className="mx-auto">
          <AvatarImage src={value} />
          <AvatarFallback>{row.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: 'fullName',
      header: 'اسم العميل',
      size: 200,
      render(value) {
        return <span className="underline underline-offset-2">{value}</span>;
      },
    },
    {
      key: 'reviewText',
      header: 'نص التقييم',
      render(value) {
        return (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center gap-2">
                <p className="text-center truncate max-w-[250px]">{value}</p>
                <Eye
                  color="#76C5F5"
                  variant="Bold"
                  className="cursor-pointer size-6 shrink-0"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-6 max-w-[300px]" side="bottom">
              {value}
            </TooltipContent>
          </Tooltip>
        );
      },
      size: 350,
    },
    {
      key: 'status',
      header: 'الحالة',
      size: 120,
      render: value => (
        <div className="flex items-center justify-center">
          <span
            className={`min-w-[115px] flex items-center justify-center gap-1.5 px-1 lg:py-px py-1.5 rounded-full text-lg max-md:text-sm ${
              value === 'active'
                ? 'bg-main-green/15 text-main-green'
                : 'bg-[#9CA3AF]/15 text-[#9CA3AF]'
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 block ${
                value === 'active' ? 'bg-main-green' : 'bg-[#9CA3AF]'
              }`}
            />
            {value === 'active' ? 'نشط' : 'غير نشط'}
          </span>
        </div>
      ),
    },
    { key: 'createdAt', header: 'تاريخ الإضافة', size: 150 },
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
      <SimpleTable<Testimonial>
        customHeader={true}
        data={testimonials}
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
            جميع آراء العملاء{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({testimonials.length}/160)
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
            <>
              <MainTestimonialsTableFilter
                filters={filters}
                setFilters={setFilters}
              />
            </>
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
          title="هل أنت متأكد من حذف التقييم؟"
          subtitle="إذا قمت بحذف التقييم لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => setDeletePopup(false),
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Testimonial deleted'),
          }}
        />
      </SimpleTable>
    </div>
  );
}
