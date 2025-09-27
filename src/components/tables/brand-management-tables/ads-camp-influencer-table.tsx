'use client';

import { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { Calendar2, CloseCircle, SearchNormal1 } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import FilterPopover from '../filter-popover';

// Status enum for better type safety
enum InfluencerStatus {
  ACTIVE = 'نشطة',
  INACTIVE = 'غير نشطة',
  COMPLETED = 'مكتملة',
  PAUSED = 'مسودة',
}

interface Influencer {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  status: InfluencerStatus;
  [key: string]: unknown;
}

// Status configuration for styling and behavior
const statusConfig = {
  [InfluencerStatus.ACTIVE]: {
    color: '#89FF7E',
    bgColor: '#89FF7E14',
    value: 'active',
  },
  [InfluencerStatus.INACTIVE]: {
    color: '#9CA3AF',
    bgColor: '#9CA3AF26',
    value: 'inactive',
  },
  [InfluencerStatus.COMPLETED]: {
    color: '#3B82F6',
    bgColor: '#3B82F614',
    value: 'completed',
  },
  [InfluencerStatus.PAUSED]: {
    color: '#FFFFFF',
    bgColor: '#FFFFFF14',
    value: 'paused',
  },
};

export default function AdsCampInfluencerTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedStatus, setSelectedStatus] = useState('الحالة');
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const [influencers] = useState<Influencer[]>([
    {
      id: '1',
      name: 'حملة العودة للمدارس',
      startDate: '01-08-2025',
      endDate: '03-08-2025',
      participantCount: 6,
      status: InfluencerStatus.COMPLETED,
    },
    {
      id: '2',
      name: 'حملة الصيف الجديد',
      startDate: '15-07-2025',
      endDate: '30-07-2025',
      participantCount: 8,
      status: InfluencerStatus.ACTIVE,
    },
    {
      id: '3',
      name: 'حملة المنتجات الطبيعية',
      startDate: '20-06-2025',
      endDate: '10-07-2025',
      participantCount: 4,
      status: InfluencerStatus.PAUSED,
    },
    {
      id: '4',
      name: 'حملة التكنولوجيا الذكية',
      startDate: '05-06-2025',
      endDate: '25-06-2025',
      participantCount: 12,
      status: InfluencerStatus.INACTIVE,
    },
    {
      id: '5',
      name: 'حملة الموضة الخريفية',
      startDate: '10-08-2025',
      endDate: '30-08-2025',
      participantCount: 15,
      status: InfluencerStatus.PAUSED,
    },
    {
      id: '6',
      name: 'حملة الصحة واللياقة',
      startDate: '01-07-2025',
      endDate: '20-07-2025',
      participantCount: 7,
      status: InfluencerStatus.ACTIVE,
    },
  ]);

  // Filter influencers based on search and status
  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'الحالة' || influencer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const renderStatusBadge = (status: InfluencerStatus) => {
    const config = statusConfig[status];
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-2 rounded-4xl  py-1 ',
          `bg-[${config.color}]`,
        )}
        style={{ backgroundColor: config.bgColor }}
      >
        <div
          className={cn('w-2 h-2 rounded-full', `bg-${config.color}`)}
          style={{ backgroundColor: config.color }}
        ></div>
        <span
          className={cn('text-lg max-lg:text-sm', `text-${config.color}`)}
          style={{ color: config.color }}
        >
          {status}
        </span>
      </div>
    );
  };

  const columns: SimpleColumn<Influencer>[] = [
    {
      key: 'name',
      header: 'اسم الحملة',
      size: 200,
      render: (value, row) => row.name,
    },
    {
      key: 'startDate',
      header: 'تاريخ البدء',
      size: 120,
      render: (value, row) => row.startDate,
    },
    {
      key: 'endDate',
      header: 'تاريخ الانتهاء',
      size: 120,
      render: (value, row) => row.endDate,
    },
    {
      key: 'status',
      header: 'الحالة',
      size: 90,
      render: (value, row) => (
        <div className={`text-center text-lg `}>
          {renderStatusBadge(row.status)}
        </div>
      ),
    },
    {
      key: 'participantCount',
      header: 'عدد المؤثرين المشاركين',
      size: 200,
      render: (value, row) => <div>{row.participantCount} مؤثر</div>,
    },
  ];

  const handleStatusChange = (value: string) => {
    const statusMap: Record<string, string> = {
      active: InfluencerStatus.ACTIVE,
      inactive: InfluencerStatus.INACTIVE,
      completed: InfluencerStatus.COMPLETED,
      paused: InfluencerStatus.PAUSED,
    };
    setSelectedStatus(statusMap[value] || 'الحالة');
  };

  //   const getSelectedStatusConfig = () => {
  //     if (selectedStatus === 'الحالة') return null;
  //     return Object.values(InfluencerStatus).find(status => status === selectedStatus);
  //   };

  useEffect(() => {
    console.log('rowSelection:', rowSelection);
  }, [rowSelection]);

  return (
    <div className="w-full h-full overflow-auto">
      <SimpleTable<Influencer>
        emptyMessage="لا توجد بيانات لعرضها حتى الآن"
        customHeader={true}
        data={filteredInfluencers}
        columns={columns}
        searchable={false}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        paginated={false}
        selectable={false}
        bulkSelect={true}
        onSelectionChange={selected => {
          console.log('Selected campaigns:', selected);
        }}
        tableLayout="auto"
        styles={{
          mainTable: 'border-separate border-spacing-y-4 ',
          container: 'rounded-2xl h-full',
          table:
            'border-0 rounded-2xl text-center transition-all duration-300  w-full h-[450px] overflow-auto pl-4',
          header: 'border- border-[#FFFFFF1A] !text-center',
          headerRow: 'border-0 !rounded-none hover:bg-transparent',
          headerCell:
            'text-main-mute text-lg border-b border-[#FFFFFF1A] border-t first:border-r last:border-l py-4 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl text-[16px] font-medium  max-lg:text-sm',
          body: 'divide-y-0',
          row: 'bg-main-container rounded-2xl',
          cell: 'text-white !text-center text-lg py-4 max-md:text-sm border-0 first:rounded-tr-xl first:rounded-br-xl last:rounded-bl-xl last:rounded-tl-xl max-lg:text-sm',
          selectedRow: 'bg-blue-900/20 border-l-4 border-l-blue-500',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={false}
      >
        <div className="flex justify-between max-[1400px]:justify-start items-center flex-wrap gap-5 border-gray-700/50 rounded-t-2xl">
          {/* Title Section */}
          <div className="flex flex-col gap-2 items-start max-lg:mb-4 max-[1400px]:w-full min-[1400px]:flex-1 text-right  ">
            <div className="text-xl text-white font-medium max-md:text-[16px]">
              الحملات الإعلانية الخاصة البراند{' '}
            </div>
            <div className="text-sm text-main-mute font-light max-md:text-xs">
              نظرة تفصيلية على حملات العلامات التجارية والمؤثرين المشاركين
            </div>
          </div>

          {/* Search Section */}
          <div className="relative max-md:w-full col-span-2">
            <Input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pr-14 rounded-3xl w-[310px] max-md:w-full max-md:text-sm"
              placeholder="ابحث باسم الحملة"
            />
            <SearchNormal1
              color="#fff"
              className="absolute top-1/2 -translate-y-1/2 right-4.5 text-xl text-white size-5"
            />
          </div>

          {/* Date Filter */}
          <FilterPopover
            title={
              fromDate && toDate
                ? `${fromDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })} - ${toDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}`
                : 'التاريخ'
            }
            startIcon={<Calendar2 variant="Bold" className="size-5" />}
          >
            <div className="max-sm:w-[300px]">
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
                  className="lg:text-lg text-sm bg-main-300 sm:px-5 px-10"
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

          {/* Status Filter */}
          <FilterPopover
            title={
              <div
                className={cn(
                  'flex items-center flex-row-reverse gap-1',
                  selectedStatus !== 'الحالة'
                    ? `text-[${statusConfig[selectedStatus as InfluencerStatus]?.color}]`
                    : 'text-main-200',
                )}
                style={{
                  color:
                    statusConfig[selectedStatus as InfluencerStatus]?.color,
                }}
              >
                {selectedStatus}
                {selectedStatus !== 'الحالة' && (
                  <div
                    className={cn('w-2 h-2 rounded-full')}
                    style={{
                      backgroundColor:
                        statusConfig[selectedStatus as InfluencerStatus]?.color,
                    }}
                  ></div>
                )}
              </div>
            }
            startIcon={
              selectedStatus !== 'الحالة' && (
                <div onClick={() => setSelectedStatus('الحالة')}>
                  <CloseCircle
                    size="42"
                    color="#76C5F5"
                    className="size-6 max-md:size-5 cursor-pointer"
                  />
                </div>
              )
            }
          >
            <div className="" dir="rtl">
              <RadioGroup
                value={
                  statusConfig[selectedStatus as InfluencerStatus]?.value || ''
                }
                className="space-y-1"
                onValueChange={handleStatusChange}
              >
                {Object.entries(statusConfig).map(([status, config], index) => (
                  <div key={status}>
                    <label
                      htmlFor={config.value}
                      className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                    >
                      <RadioGroupItem value={config.value} id={config.value} />
                      <div
                        className={cn('w-2 h-2 rounded-full')}
                        style={{ backgroundColor: config.color }}
                      ></div>
                      <span
                        className={cn('ml-auto')}
                        style={{ color: config.color }}
                      >
                        {status}
                      </span>
                    </label>
                    {index !== Object.entries(statusConfig).length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </FilterPopover>
        </div>
      </SimpleTable>
    </div>
  );
}
