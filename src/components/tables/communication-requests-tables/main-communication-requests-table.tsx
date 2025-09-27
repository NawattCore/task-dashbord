'use client';

import { useState } from 'react';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { Edit2, Eye, Trash } from 'iconsax-reactjs';
import Image from 'next/image';

import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { useOpenSidebar } from '@/context/use-open-sidebar';
import PopupComponent from '@/components/general-components/Popup-component';
import { srcs } from '@/config/scrs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import MainCommunicationFilter from './main-communication-filter';
interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  contacted: boolean;
  type: 'شراكة تجارية' | 'طلب معلومات' | 'اقتراح';
  date: string;
}

export default function ContactRequestsTable() {
  const { isSidebarOpen } = useOpenSidebar();
  const [deletePopup, setDeletePopup] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    contacted: '',
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [requests] = useState<ContactRequest[]>([
    {
      id: '1',
      name: 'نيرة مجدي',
      email: 'naira.magdy@example.com',
      phone: '+966 500111222',
      message: 'مرحباً، أنا مهتمة بالتعاون على حملة موسمية.',
      contacted: true,
      type: 'شراكة تجارية',
      date: '02-04-2025',
    },
    {
      id: '2',
      name: 'محمد أحمد',
      email: 'm.ahmed@example.com',
      phone: '+966 500222333',
      message: 'هل يمكنكم تزويدي بمعلومات إضافية عن الأسعار؟',
      contacted: false,
      type: 'طلب معلومات',
      date: '03-04-2025',
    },
    {
      id: '3',
      name: 'سارة علي',
      email: 'sara.ali@example.com',
      phone: '+966 500333444',
      message: 'لدي اقتراح حول تحسين تجربة المستخدم.',
      contacted: false,
      type: 'اقتراح',
      date: '04-04-2025',
    },
    {
      id: '4',
      name: 'أحمد خالد',
      email: 'ahmed.khaled@example.com',
      phone: '+966 500444555',
      message: 'نرغب في شراكة لمنتج جديد خلال الربع القادم.',
      contacted: true,
      type: 'شراكة تجارية',
      date: '05-04-2025',
    },
    {
      id: '5',
      name: 'ريم حسن',
      email: 'reem.hassan@example.com',
      phone: '+966 500555666',
      message: 'أحتاج تفاصيل أكثر عن خطط الاشتراك.',
      contacted: false,
      type: 'طلب معلومات',
      date: '06-04-2025',
    },
    {
      id: '6',
      name: 'عبدالله صالح',
      email: 'abdullah.saleh@example.com',
      phone: '+966 500666777',
      message: 'اقترح إضافة ميزة التقارير الشهرية.',
      contacted: true,
      type: 'اقتراح',
      date: '07-04-2025',
    },
    {
      id: '7',
      name: 'ليلى محمد',
      email: 'layla.mohammed@example.com',
      phone: '+966 500777888',
      message: 'نبحث عن تعاون طويل الأمد مع منصتكم.',
      contacted: false,
      type: 'شراكة تجارية',
      date: '08-04-2025',
    },
    {
      id: '8',
      name: 'خالد عمر',
      email: 'khaled.omar@example.com',
      phone: '+966 500888999',
      message: 'ما هي أفضل خطة للشركات الناشئة؟',
      contacted: true,
      type: 'طلب معلومات',
      date: '09-04-2025',
    },
    {
      id: '9',
      name: 'نورة السالم',
      email: 'nora.alsalem@example.com',
      phone: '+966 500999000',
      message: 'أقترح دمج تنبيهات فورية عبر البريد.',
      contacted: false,
      type: 'اقتراح',
      date: '10-04-2025',
    },
    {
      id: '10',
      name: 'خديجة منصور',
      email: 'khadija.mansour@example.com',
      phone: '+966 501111333',
      message: 'هل يمكننا جدولة مكالمة لفرصة شراكة؟',
      contacted: true,
      type: 'شراكة تجارية',
      date: '11-04-2025',
    },
    {
      id: '11',
      name: 'مروان فهد',
      email: 'marwan.fahd@example.com',
      phone: '+966 501222444',
      message: 'أحتاج قائمة بالمزايا التفصيلية للخطة المتقدمة.',
      contacted: false,
      type: 'طلب معلومات',
      date: '12-04-2025',
    },
    {
      id: '12',
      name: 'هند العتيبي',
      email: 'hind.otaibi@example.com',
      phone: '+966 501333555',
      message: 'أقترح دعم أكثر للغة العربية في التقارير.',
      contacted: true,
      type: 'اقتراح',
      date: '13-04-2025',
    },
  ]);

  const columns: SimpleColumn<ContactRequest>[] = [
    {
      key: 'name',
      header: 'الاسم بالكامل',
      render(value) {
        return (
          <div className="flex items-center justify-center">
            <p className="underline cursor-pointer underline-offset-2">
              {value as string}
            </p>
          </div>
        );
      },
      size: 160,
    },
    {
      key: 'type',
      header: 'النوع',
      size: 140,
      render: val => (
        <span
          className={`px-3 py-1 rounded-full ${
            val === 'شراكة تجارية'
              ? 'bg-[#E7762633] text-[#E77626]'
              : val === 'طلب معلومات'
                ? 'bg-[#FA34BF33] text-[#FA34BF]'
                : 'bg-[#10B98133] text-[#10B981]'
          }`}
        >
          #{val}
        </span>
      ),
    },
    {
      key: 'contacted',
      header: 'تم التواصل؟',
      size: 120,
      render: value => (value ? 'نعم' : 'لا'),
    },
    { key: 'email', header: 'البريد الإلكتروني', size: 200 },
    {
      key: 'phone',
      header: 'رقم الهاتف',
      render(value) {
        return (
          <p className="text-center" dir="ltr">
            {value}
          </p>
        );
      },
      size: 160,
    },
    {
      key: 'message',
      header: 'الرسالة',
      render(value) {
        return (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center gap-2">
                <p className="text-center truncate max-w-[150px]">{value}</p>
                <Eye
                  color="#76C5F5"
                  variant="Bold"
                  className="cursor-pointer size-6 shrink-0"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-6 " side="bottom">
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
      size: 200,
    },
    { key: 'date', header: 'تاريخ الإرسال', size: 140 },
    {
      key: 'id',
      header: 'الإجراءات',
      size: 120,
      render: () => (
        <div className="flex items-center justify-center gap-3">
          <div className="bg-[#76C5F5]/15 p-2 rounded-full cursor-pointer hover:bg-[#76C5F5]/25">
            <Edit2 size="20" color="#76C5F5" variant="Bold" />
          </div>
          <div
            className="bg-[#FF3F43]/15 p-2 rounded-full cursor-pointer hover:bg-[#FF3F43]/25"
            onClick={() => setDeletePopup(true)}
          >
            <Trash size="20" color="#FF3F43" variant="Bold" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <SimpleTable<ContactRequest>
      customHeader={true}
      data={requests}
      columns={columns}
      searchable={true}
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
        pagination: 'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
        pageSize: 'text-white',
      }}
      stickyHeader={true}
    >
      <div className="flex justify-between items-center px-4 py-4 flex-wrap gap-5">
        {/* Title Section */}
        <div className="text-white text-2xl max-md:text-lg">
          جميع طلبات التواصل{' '}
          <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
            ({requests.length}/160)
          </span>
        </div>
        {Object.keys(rowSelection).length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={'main_outline_destructive'}
              className=" rounded-3xl max-sm:px-3"
              onClick={() => setDeletePopup(true)}
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
          <>
            <MainCommunicationFilter
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
        title="هل أنت متأكد من حذف حالة الاتصال؟"
        subtitle="إذا قمت بحذف حالة الاتصال لن تستطيع إرجاع أي بيانات خاصة به مرة أخرى"
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
  );
}
