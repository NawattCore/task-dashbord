import React, { Dispatch, SetStateAction } from 'react';
import { Calendar2, CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

import FilterPopover from '../filter-popover';

type FilterState = {
  status: string;
  targetFrom: string;
  targetTo: string;
  fromDate: Date | null;
  toDate: Date | null;
};

const MIN_TARGET = 0;
const MAX_TARGET = 10000000;

const CampaignsTableFilter = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}) => {
  const statusOptions = [
    {
      value: 'active',
      label: 'نشط',
      textColor: 'text-main-green',
      bgColor: 'bg-main-green',
    },
    {
      value: 'cancelled',
      label: 'ملغاة',
      textColor: 'text-[#9CA3AF]',
      bgColor: 'bg-[#9CA3AF]',
    },
    {
      value: 'pending',
      label: 'قيد الانتظار',
      textColor: 'text-[#FACC15]',
      bgColor: 'bg-[#FACC15]',
    },
    {
      value: 'completed',
      label: 'مكتملة',
      textColor: 'text-[#3B82F6]',
      bgColor: 'bg-[#3B82F6]',
    },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      <FilterPopover
        title={
          filters.fromDate && filters.toDate
            ? `${filters.fromDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })} - ${filters.toDate.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}`
            : 'التاريخ'
        }
        startIcon={<Calendar2 variant="Bold" className="size-5" />}
      >
        <div className=" max-sm:w-[300px]">
          <div className="flex sm:gap-4 gap-2 flex-1">
            <Input
              placeholder="من"
              value={
                filters.fromDate
                  ? filters.fromDate.toLocaleDateString('ar-EG', {
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
                filters.toDate
                  ? filters.toDate.toLocaleDateString('ar-EG', {
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
              selected={filters.fromDate ?? undefined}
              onSelect={(date?: Date) =>
                setFilters(prev => ({ ...prev, fromDate: date ?? null }))
              }
              className="rounded-lg"
            />
            <Calendar
              mode="single"
              selected={filters.toDate ?? undefined}
              onSelect={(date?: Date) =>
                setFilters(prev => ({ ...prev, toDate: date ?? null }))
              }
              className="rounded-lg"
            />
          </div>
        </div>
      </FilterPopover>
      <FilterPopover
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.targetFrom || filters.targetTo
                ? 'text-white'
                : 'text-main-200',
            )}
          >
            {filters.targetFrom && `من :${filters.targetFrom}`}
            {filters.targetFrom && filters.targetTo && ' - '}
            {filters.targetTo && `الى :${filters.targetTo}`}
            {!filters.targetFrom && !filters.targetTo && 'الهدف'}
          </div>
        }
        startIcon={
          (filters.targetFrom || filters.targetTo) && (
            <div
              onClick={() =>
                setFilters({
                  ...filters,
                  targetFrom: '',
                  targetTo: '',
                })
              }
            >
              <CloseCircle
                size="42"
                color="#76C5F5"
                className="size-6 max-md:size-5"
              />
            </div>
          )
        }
      >
        <div className="w-[170px] space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="200 ألف"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.targetFrom}
              onChange={e =>
                setFilters({
                  ...filters,
                  targetFrom: e.target.value,
                })
              }
            />
            <Input
              placeholder="500 ألف"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.targetTo}
              onChange={e =>
                setFilters({
                  ...filters,
                  targetTo: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <p className="text-sm text-white">
                {filters.targetFrom || MIN_TARGET}
              </p>
              <p className="text-sm text-white">
                {filters.targetTo || MAX_TARGET}
              </p>
            </div>

            <Slider
              defaultValue={[MIN_TARGET]}
              max={MAX_TARGET}
              step={1}
              dir="rtl"
              value={[Number(filters.targetFrom), Number(filters.targetTo)]}
              onValueChange={(vals: number[]) =>
                setFilters({
                  ...filters,
                  targetFrom: String(vals[0] ?? 0),
                  targetTo: String(vals[1] ?? 0),
                })
              }
            />
          </div>
        </div>
      </FilterPopover>
      <FilterPopover
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              statusOptions.find(option => option.label === filters.status)
                ?.textColor || 'text-main-200',
            )}
          >
            {filters.status || 'الحالة'}
            {filters.status && (
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  statusOptions.find(option => option.label === filters.status)
                    ?.bgColor,
                )}
              />
            )}
          </div>
        }
        startIcon={
          filters.status && (
            <div onClick={() => setFilters({ ...filters, status: '' })}>
              <CloseCircle
                size="42"
                color="#76C5F5"
                className="size-6 max-md:size-5"
              />
            </div>
          )
        }
      >
        <div className="" dir="rtl">
          <RadioGroup
            defaultValue={filters.status}
            className="space-y-1"
            onValueChange={value => {
              const selectedOption = statusOptions.find(
                option => option.value === value,
              );
              if (selectedOption) {
                setFilters({
                  ...filters,
                  status: selectedOption.label,
                });
              }
            }}
          >
            {statusOptions.map((option, index) => (
              <div key={option.value}>
                <label
                  htmlFor={option.value}
                  className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <div className={cn('w-2 h-2 rounded-full', option.bgColor)} />
                  <span className={cn('ml-auto', option.textColor)}>
                    {option.label}
                  </span>
                </label>
                {index < statusOptions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      </FilterPopover>
    </div>
  );
};

export default CampaignsTableFilter;
