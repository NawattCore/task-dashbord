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

import CampaignsTableFilter from './campaigns-filter';

interface Campaign {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  goal: string;
  brand: string;
  company: string;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
}

export default function MainCampaignsTable() {
  const [filters, setFilters] = useState({
    status: '',
    targetFrom: '',
    targetTo: '',
    fromDate: null as Date | null,
    toDate: null as Date | null,
  });
  const [deletePopup, setDeletePopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'حملة يوم التأسيس',
      type: 'توعية',
      startDate: '02-05-2025',
      endDate: '10-05-2025',
      goal: 'زيادة الوصول',
      brand: 'أورا بيوتي',
      company: 'أورا بيوتي للتسويق الالكتروني',
      status: 'active',
    },
    {
      id: '2',
      name: 'حملة يوم التأسيس',
      type: 'توعية',
      startDate: '02-05-2025',
      endDate: '10-05-2025',
      goal: 'زيادة الوصول',
      brand: 'أورا بيوتي',
      company: 'أورا بيوتي للتسويق الالكتروني',
      status: 'cancelled',
    },
    {
      id: '3',
      name: 'حملة يوم التأسيس',
      type: 'توعية',
      startDate: '02-05-2025',
      endDate: '10-05-2025',
      goal: 'زيادة الوصول',
      brand: 'أورا بيوتي',
      company: 'أورا بيوتي للتسويق الالكتروني',
      status: 'pending',
    },
    {
      id: '4',
      name: 'حملة يوم التأسيس',
      type: 'توعية',
      startDate: '02-05-2025',
      endDate: '10-05-2025',
      goal: 'زيادة الوصول',
      brand: 'أورا بيوتي',
      company: 'أورا بيوتي للتسويق الالكتروني',
      status: 'completed',
    },
  ]);

  const columns: SimpleColumn<Campaign>[] = [
    {
      key: 'name',
      header: 'اسم الحملة',
      render(value) {
        return (
          <p className="underline cursor-pointer underline-offset-2">{value}</p>
        );
      },
      size: 180,
    },
    { key: 'type', header: 'نوع الحملة', size: 120 },
    { key: 'startDate', header: 'تاريخ البدء', size: 120 },
    { key: 'endDate', header: 'تاريخ الانتهاء', size: 140 },
    { key: 'goal', header: 'الهدف', size: 140 },
    { key: 'brand', header: 'العلامة التجارية', size: 140 },
    { key: 'company', header: 'الشركة', size: 250 },
    {
      key: 'status',
      header: 'الحالة',
      size: 140,
      render(value) {
        const status = value as Campaign['status'];
        const styles =
          status === 'active'
            ? 'bg-main-green/15 text-main-green'
            : status === 'completed'
              ? 'bg-[#3B82F6]/15 text-[#3B82F6]'
              : status === 'cancelled'
                ? 'bg-[#FF3F43]/15 text-[#FF3F43]'
                : 'bg-[#FACC1526] text-[#FACC15]';

        const dot =
          status === 'active'
            ? 'bg-main-green'
            : status === 'completed'
              ? 'bg-[#3B82F6]'
              : status === 'cancelled'
                ? 'bg-[#FF3F43]'
                : 'bg-yellow-500';

        const text =
          status === 'active'
            ? 'نشطة'
            : status === 'completed'
              ? 'مكتملة'
              : status === 'cancelled'
                ? 'ملغاة'
                : 'معلقة';

        return (
          <div
            className={`min-w-[115px] flex items-center justify-center gap-1.5 px-1 lg:py-px py-1.5  rounded-full text-lg max-md:text-sm ${styles}`}
          >
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            {text}
          </div>
        );
      },
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
      <SimpleTable<Campaign>
        customHeader={true}
        data={campaigns}
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
            جميع الحملات{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({campaigns.length}/160)
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
            <CampaignsTableFilter filters={filters} setFilters={setFilters} />
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
          title="هل أنت متأكد من حذف الحملة؟"
          subtitle="إذا قمت بحذف الحملة لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => setDeletePopup(false),
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => console.log('Campaign deleted'),
          }}
        />
      </SimpleTable>
    </div>
  );
}
