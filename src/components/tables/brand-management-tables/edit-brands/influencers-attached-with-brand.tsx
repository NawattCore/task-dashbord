'use client';

import { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { Export, ImportCurve, SearchNormal1, Trash } from 'iconsax-reactjs';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { srcs } from '@/config/scrs';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Input } from '@/components/ui/input';
import PopupComponent from '@/components/general-components/Popup-component';

import InfluencersTableFilter from '../../influencers-tables/influencers-filter';

interface Influencer {
  id: string;
  name: string;
  qrCode: string;
  category: string;
  photo: string;
}

export default function InfluencersAttachedWithBrand() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteBrandPopup, setDeleteBrandPopup] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    country: [] as string[],
    city: [] as string[],
    category: [] as string[],
    followersNoFrom: '',
    followersNoTo: '',
    sorting: '',
  });
  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'كريم عبد الله',
      qrCode: '/api/qrcode/karimabdullah', // أو مسار صورة QR
      category: 'الفاشون',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '2',
      name: 'سارة أحمد',
      qrCode: '/api/qrcode/sarah_ahmed',
      category: 'المكياج',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '3',
      name: 'محمد الخالد',
      qrCode: '/api/qrcode/mohammed_k',
      category: 'الرياضة',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '4',
      name: 'نورا السعيد',
      qrCode: '/api/qrcode/nora_happy',
      category: 'السفر',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '5',
      name: 'أحمد الزهراني',
      qrCode: '/api/qrcode/ahmed_z',
      category: 'الطبخ',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '6',
      name: 'فاطمة الحربي',
      qrCode: '/api/qrcode/fatma_harbi',
      category: 'التعليم',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '7',
      name: 'عبدالله النجار',
      qrCode: '/api/qrcode/abdullah_najjar',
      category: 'الكوميديا',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '8',
      name: 'ريما الخالد',
      qrCode: '/api/qrcode/rima_khalid',
      category: 'الموضة',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '9',
      name: 'ليلى المنصوري',
      qrCode: '/api/qrcode/layla_mansouri',
      category: 'الصحة',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '10',
      name: 'خالد البراك',
      qrCode: '/api/qrcode/khalid_albarak',
      category: 'التكنولوجيا',
      photo: '/api/qrcode/maryam_otaibi',
    },
    {
      id: '11',
      name: 'مريم العتيبي',
      qrCode: '/api/qrcode/maryam_otaibi',
      category: 'الطبخ',
      photo: '/api/qrcode/maryam_otaibi',
    },
  ]);

  const columns: SimpleColumn<Influencer>[] = [
    {
      key: 'photo',
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
      size: 120,
      render: (value, row) => (
        <div className="text-center">
          <div className=" text-white ">{row.name}</div>
        </div>
      ),
    },
    {
      key: 'qrCode',
      header: 'QR Code',
      size: 120,
      render: () => (
        <div className="text-center flex  items-center justify-center gap-2">
          <Image src={srcs.qrCode} alt="QR Code" width={50} height={50} />
          <div className=" text-main-300 flex items-center gap-2 border-b border-main-300 cursor-pointer">
            <ImportCurve size="20" color="#1DA1F2" />
            <span className="text-lg">تنزيل</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'التصنيف',
      size: 120,
      render: (value, row) => (
        <div className="text-center">
          <div className=" text-white ">{row.category}</div>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'الإجراءات',
      size: 150,
      render: () => (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={'main_outline_destructive'}
            className=" rounded-3xl max-sm:px-3"
            onClick={() => setDeleteBrandPopup(true)}
          >
            <Trash color="#FF3F43" variant="Bold" className="!w-6 !h-6" />
            <div>حذف المؤثر</div>
          </Button>
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
        selectable={true}
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
            'text-main-mute text-lg border-b border-[#FFFFFF1A] border-t first:border-r last:border-l py-4 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl text-[16px] font-medium max-lg:text-sm !text-center   ',
          body: 'divide-y-0',
          row: ' bg-main-container rounded-2xl',
          cell: 'text-white !text-center text-lg py-4 max-md:text-sm border-0 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl max-lg:text-sm',
          selectedRow: '!bg-main-container border-l-4 border-l-blue-500',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={false}
      >
        <div className="flex justify-between items-center flex-wrap gap-5 border-gray-700/50 rounded-t-2xl">
          {/* Title Section */}
          <div className="flex flex-col gap-2 items-start   max-lg:mb-4 text-right flex-1 w-fit text-nowrap">
            <div className="text-xl text-white font-medium max-md:text-[16px]  ">
              {' '}
              المؤثرين المعينين لهذا البراند
            </div>
            <div className="text-sm text-main-mute max-md:text-xs font-light ">
              الحملات التي تم إطلاقها في العام الحالي
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
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
            <InfluencersTableFilter
              filters={filters}
              setFilters={setFilters}
              showCategory={true}
              showFollowers={false}
              showCountry={false}
              showSorting={false}
              showStatus={false}
            />
            <Button variant={'main_outline_yellow'} className=" rounded-3xl">
              <Export
                size="32"
                color="#E49F31"
                variant="Bold"
                className="!w-6 !h-6"
              />
              تصدير البيانات
            </Button>
          </div>
        </div>
      </SimpleTable>
      <PopupComponent
        isOpen={deleteBrandPopup}
        onClose={() => setDeleteBrandPopup(false)}
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
        subtitle="إذا قمت بحذف المؤثر لن تستطيف إرجاع أي بيانات خاصة به مرة أخرى"
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
    </div>
  );
}
