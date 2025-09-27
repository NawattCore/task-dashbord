import React, { Dispatch, SetStateAction } from 'react';
import { CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

import FilterPopover from '../filter-popover';

type FilterState = {
  type: string;
  contacted: string;
};

const MainCommunicationFilter = ({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}) => {
  const contactedOptions = [
    {
      value: 'نعم',
      label: 'نعم',
      bgColor: 'bg-main-green text-main-green',
      textColor: 'text-main-green',
    },
    {
      value: 'لا',
      label: 'لا',
      bgColor: 'bg-main-red text-main-red',
      textColor: 'text-main-red',
    },
  ];

  const typeOptions = [
    { value: 'influencer', label: 'مؤثر' },
    { value: 'brand', label: 'علامة تجارية' },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      <FilterPopover
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.contacted === 'نعم'
                ? contactedOptions?.[0]?.textColor
                : filters.contacted === 'لا'
                  ? contactedOptions?.[1]?.textColor
                  : 'text-main-200',
            )}
          >
            {filters.contacted || 'تم التواصل؟'}
            {filters.contacted && (
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  filters.contacted === 'نعم'
                    ? contactedOptions?.[0]?.bgColor
                    : contactedOptions?.[1]?.bgColor,
                )}
              />
            )}
          </div>
        }
        startIcon={
          filters.contacted && (
            <div onClick={() => setFilters({ ...filters, contacted: '' })}>
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
            defaultValue={filters.contacted}
            className="space-y-1"
            onValueChange={value => {
              const selectedOption = contactedOptions.find(
                option => option.value === value,
              );
              if (selectedOption) {
                setFilters({
                  ...filters,
                  contacted: selectedOption.label,
                });
              }
            }}
          >
            {contactedOptions.map((option, index) => (
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
                {index < contactedOptions.length - 1 && (
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
              filters.type ? 'text-white' : 'text-main-200',
            )}
          >
            {filters.type || 'النوع'}
          </div>
        }
        startIcon={
          filters.type && (
            <div onClick={() => setFilters({ ...filters, type: '' })}>
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
            defaultValue={filters.type}
            className="space-y-1"
            onValueChange={value => {
              const selectedOption = typeOptions.find(
                option => option.value === value,
              );
              if (selectedOption) {
                setFilters({
                  ...filters,
                  type: selectedOption.label,
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
    </div>
  );
};

export default MainCommunicationFilter;
