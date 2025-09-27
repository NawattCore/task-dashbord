import React, { Dispatch, SetStateAction } from 'react';
import { CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import FilterPopover from '../filter-popover';
import { SortingFilter } from '../common-filters';

type FilterState = {
  status: string;
  sorting: string;
  role: string;
};

const MainModeratorsTableFilter = ({
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
  const sortingOptions = {
    label: 'ترتيب حسب',
    values: [
      {
        value: 'asc',
        label: 'A - Z',
        textColor: 'text-white',
      },
      {
        value: 'desc',
        label: 'Z - A',
        textColor: 'text-white',
      },
    ],
  };
  const typeOptions = [
    { value: 'sales', label: 'Sales' },
    { value: 'admin', label: 'Admin' },
    { value: 'operation', label: 'Operation' },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      <FilterPopover
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.role ? 'text-white' : 'text-main-200',
            )}
          >
            {filters.role || 'الدور'}
          </div>
        }
        startIcon={
          filters.role && (
            <div onClick={() => setFilters({ ...filters, role: '' })}>
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
            defaultValue={filters.role}
            className="space-y-1"
            onValueChange={value => {
              const selectedOption = typeOptions.find(
                option => option.value === value,
              );
              if (selectedOption) {
                setFilters({
                  ...filters,
                  role: selectedOption.label,
                });
              }
            }}
          >
            {typeOptions.map((option, index) => (
              <div key={option.value}>
                <label
                  htmlFor={option.value}
                  className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <span className={'ml-auto'}>{option.label}</span>
                </label>
                {index < typeOptions.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </RadioGroup>
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

      <SortingFilter
        filters={filters}
        setFilters={setFilters}
        sortingOptions={sortingOptions}
      />
    </div>
  );
};

export default MainModeratorsTableFilter;
