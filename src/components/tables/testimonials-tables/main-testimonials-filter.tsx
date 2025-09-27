import React, { Dispatch, SetStateAction } from 'react';
import { CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import FilterPopover from '../filter-popover';

type FilterState = {
  status: string;
};

const MainTestimonialsTableFilter = ({
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
      value: 'inactive',
      label: 'غير نشط',
      textColor: 'text-[#9CA3AF]',
      bgColor: 'bg-[#9CA3AF]',
    },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
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

export default MainTestimonialsTableFilter;
