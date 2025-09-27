'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Edit2, Trash } from 'iconsax-reactjs';
import Link from 'next/link';

import { useOpenSidebar } from '@/context/use-open-sidebar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import PopupComponent from '@/components/general-components/Popup-component';
import { srcs } from '@/config/scrs';

interface Company {
  id: string;
  companyName: string;
  link: string;
}

export default function CompaniesTable() {
  const [deletePopup, setDeletePopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [companies] = useState<Company[]>([
    {
      id: '1',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '2',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '3',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '4',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '5',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '6',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '7',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
    {
      id: '8',
      companyName: 'مدار للحلول البرمجية',
      link: 'https://madar.solutions.company.com',
    },
  ]);

  const columns: SimpleColumn<Company>[] = [
    { key: 'companyName', header: 'اسم الشركة', size: 200 },
    {
      key: 'link',
      header: 'الرابط',
      size: 300,
      render: value => (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
          dir="ltr"
        >
          {value}
        </Link>
      ),
    },
    {
      key: 'id',
      header: 'الإجراءات',
      size: 250,
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
      <SimpleTable<Company>
        customHeader={true}
        data={companies}
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
        <div className="flex justify-between items-center px-4 py-4 sm:h-[75px] flex-wrap gap-5">
          <div className="text-white text-2xl max-md:text-lg">
            جميع الشركات{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({companies.length}/160)
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
          ) : null}
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
          title="هل أنت متأكد من حذف الشركة؟"
          subtitle="إذا قمت بحذف الشركة لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => setDeletePopup(false),
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Company deleted'),
          }}
        />
      </SimpleTable>
    </div>
  );
}
