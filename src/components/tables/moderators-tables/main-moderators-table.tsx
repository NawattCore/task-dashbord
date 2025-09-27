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

import MainModeratorsTableFilter from './main-moderators-filter';

interface Supervisor {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: 'Sales' | 'Admin' | 'Operation';
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function SupervisorsTable() {
  const [filters, setFilters] = useState({
    status: '',
    sorting: '',
    role: '',
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [supervisors] = useState<Supervisor[]>([
    {
      id: '1',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Sales',
      status: 'active',
      createdAt: '01-03-2025',
    },
    {
      id: '2',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Admin',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
    {
      id: '3',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'active',
      createdAt: '01-03-2025',
    },
    {
      id: '4',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
    {
      id: '5',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
    {
      id: '6',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
    {
      id: '7',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
    {
      id: '8',
      fullName: 'نيرة مجدي عبد الرحمن',
      username: '@nairamagdy3',
      email: 'nairamagdy3@gmail.com',
      role: 'Operation',
      status: 'inactive',
      createdAt: '01-03-2025',
    },
  ]);

  const columns: SimpleColumn<Supervisor>[] = [
    {
      key: 'fullName',
      header: 'الاسم بالكامل',
      render(value) {
        return <span className="underline underline-offset-2">{value}</span>;
      },
      size: 200,
    },
    {
      key: 'username',
      header: 'اسم المستخدم',
      render(value) {
        return <span dir="ltr">{value}</span>;
      },
      size: 160,
    },
    { key: 'email', header: 'البريد الإلكتروني', size: 200 },
    { key: 'role', header: 'الدور', size: 120 },
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
    { key: 'createdAt', header: 'تاريخ الإنشاء', size: 150 },
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
      <SimpleTable<Supervisor>
        customHeader={true}
        data={supervisors}
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
            جميع المشرفين{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({supervisors.length}/160)
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
              <MainModeratorsTableFilter
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
          title="هل أنت متأكد من حذف المشرف؟"
          subtitle="إذا قمت بحذف المشرف لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => setDeletePopup(false),
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Supervisor deleted'),
          }}
        />
      </SimpleTable>
    </div>
  );
}
