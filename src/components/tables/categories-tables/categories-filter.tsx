import React, { Dispatch, SetStateAction } from 'react';
import { CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

import FilterPopover from '../filter-popover';
import { SortingFilter } from '../common-filters';

type FilterState = {
  status: string;
  sorting: string;
  influencersNoFrom: string;
  influencersNoTo: string;
  campaignsNoFrom: string;
  campaignsNoTo: string;
};

const MIN_INFLUENCERS = 0;
const MAX_INFLUENCERS = 10000000;
const MIN_CAMPAIGNS = 0;
const MAX_CAMPAIGNS = 10000;

const MainCategoriesTableFilter = ({
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
        label: 'الأقل للأعلى',
        textColor: 'text-white',
      },
      {
        value: 'desc',
        label: 'الأعلى للأقل',
        textColor: 'text-white',
      },
    ],
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <FilterPopover
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.campaignsNoFrom || filters.campaignsNoTo
                ? 'text-white'
                : 'text-main-200',
            )}
          >
            {filters.campaignsNoFrom && `من :${filters.campaignsNoFrom}`}
            {filters.campaignsNoFrom && filters.campaignsNoTo && ' - '}
            {filters.campaignsNoTo && `الى :${filters.campaignsNoTo}`}
            {!filters.campaignsNoFrom &&
              !filters.campaignsNoTo &&
              'عدد الحملات'}
          </div>
        }
        startIcon={
          (filters.campaignsNoFrom || filters.campaignsNoTo) && (
            <div
              onClick={() =>
                setFilters({
                  ...filters,
                  campaignsNoFrom: '',
                  campaignsNoTo: '',
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
              placeholder="200"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.campaignsNoFrom}
              onChange={e =>
                setFilters({
                  ...filters,
                  campaignsNoFrom: e.target.value,
                })
              }
            />
            <Input
              placeholder="500"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.campaignsNoTo}
              onChange={e =>
                setFilters({
                  ...filters,
                  campaignsNoTo: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <p className="text-sm text-white">
                {filters.campaignsNoFrom || MIN_CAMPAIGNS}
              </p>
              <p className="text-sm text-white">
                {filters.campaignsNoTo || MAX_CAMPAIGNS}
              </p>
            </div>

            <Slider
              defaultValue={[MIN_CAMPAIGNS]}
              max={MAX_CAMPAIGNS}
              step={1}
              dir="rtl"
              value={[
                Number(filters.campaignsNoFrom),
                Number(filters.campaignsNoTo),
              ]}
              onValueChange={(vals: number[]) =>
                setFilters({
                  ...filters,
                  campaignsNoFrom: String(vals[0] ?? 0),
                  campaignsNoTo: String(vals[1] ?? 0),
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
              filters.influencersNoFrom || filters.influencersNoTo
                ? 'text-white'
                : 'text-main-200',
            )}
          >
            {filters.influencersNoFrom && `من :${filters.influencersNoFrom}`}
            {filters.influencersNoFrom && filters.influencersNoTo && ' - '}
            {filters.influencersNoTo && `الى :${filters.influencersNoTo}`}
            {!filters.influencersNoFrom &&
              !filters.influencersNoTo &&
              'عدد المؤثرين'}
          </div>
        }
        startIcon={
          (filters.influencersNoFrom || filters.influencersNoTo) && (
            <div
              onClick={() =>
                setFilters({
                  ...filters,
                  influencersNoFrom: '',
                  influencersNoTo: '',
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
              value={filters.influencersNoFrom}
              onChange={e =>
                setFilters({
                  ...filters,
                  influencersNoFrom: e.target.value,
                })
              }
            />
            <Input
              placeholder="500 ألف"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.influencersNoTo}
              onChange={e =>
                setFilters({
                  ...filters,
                  influencersNoTo: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <p className="text-sm text-white">
                {filters.influencersNoFrom || MIN_INFLUENCERS}
              </p>
              <p className="text-sm text-white">
                {filters.influencersNoTo || MAX_INFLUENCERS}
              </p>
            </div>

            <Slider
              defaultValue={[MIN_INFLUENCERS]}
              max={MAX_INFLUENCERS}
              step={1}
              dir="rtl"
              value={[
                Number(filters.influencersNoFrom),
                Number(filters.influencersNoTo),
              ]}
              onValueChange={(vals: number[]) =>
                setFilters({
                  ...filters,
                  influencersNoFrom: String(vals[0] ?? 0),
                  influencersNoTo: String(vals[1] ?? 0),
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

      <SortingFilter
        filters={filters}
        setFilters={setFilters}
        sortingOptions={sortingOptions}
      />
    </div>
  );
};

export default MainCategoriesTableFilter;
