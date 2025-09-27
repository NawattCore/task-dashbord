import React, { Dispatch, SetStateAction } from 'react';
import { CloseCircle } from 'iconsax-reactjs';

import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { formatFollowersCount } from '@/lib/helper';

import FilterPopover from '../filter-popover';
import { CountryFilter, SortingFilter } from '../common-filters';

type FilterState = {
  status: string;
  country: string[];
  city: string[];
  category: string[];
  followersNoFrom: string;
  followersNoTo: string;
  sorting: string;
};

type FilterVisibility = {
  showCategory?: boolean;
  showFollowers?: boolean;
  showCountry?: boolean;
  showSorting?: boolean;
  showStatus?: boolean;
};

const MIN_FOLLOWERS_NO = 0;
const MAX_FOLLOWERS_NO = 10000000;

const InfluencersTableFilter = ({
  filters,
  setFilters,
  showCategory = true,
  showFollowers = true,
  showCountry = true,
  showSorting = true,
  showStatus = true,
}: {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
} & FilterVisibility) => {
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
    {
      value: 'pending',
      label: 'قيد الانتظار',
      textColor: 'text-[#FACC15]',
      bgColor: 'bg-[#FACC15]',
    },
  ];

  const categoryOptions = [
    'الصحة',
    'التجميل',
    'الرياضة',
    'التغذية',
    'الفن',
    'الموسيقى',
    'السياحة',
    'السفر',
  ];

  const sortingOptions = {
    label: 'ترتيب حسب الاسم',
    values: [
      {
        value: 'asc',
        label: 'الألف للياء',
        textColor: 'text-white',
      },
      {
        value: 'desc',
        label: 'الياء للألف',
        textColor: 'text-white',
      },
    ],
  };

  const filtersToRender = [
    showCategory && (
      <FilterPopover
        key="category"
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.category.length > 0 ? 'text-white' : 'text-main-200',
            )}
          >
            <p className="truncate max-w-[200px]">
              {filters.category.length > 0
                ? filters.category.map(category => `#${category}`).join(' ')
                : 'التصنيفات'}
            </p>
          </div>
        }
        startIcon={
          filters.category.length > 0 && (
            <div onClick={() => setFilters({ ...filters, category: [] })}>
              <CloseCircle
                size="42"
                color="#76C5F5"
                className="size-6 max-md:size-5"
              />
            </div>
          )
        }
      >
        <div className="h-[300px] overflow-y-auto" dir="rtl">
          <div className="space-y-1">
            {categoryOptions.map((label, index) => (
              <div key={label}>
                <label
                  htmlFor={`category-${index}`}
                  className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                >
                  <span className={cn('ml-auto')}>{label}</span>
                  <Checkbox
                    id={`category-${index}`}
                    checked={filters.category.includes(label)}
                    onCheckedChange={checked => {
                      setFilters(prev => {
                        const isChecked = Boolean(checked);
                        if (isChecked) {
                          if (prev.category.includes(label)) return prev;
                          return {
                            ...prev,
                            category: [...prev.category, label],
                          };
                        } else {
                          return {
                            ...prev,
                            category: prev.category.filter(c => c !== label),
                          };
                        }
                      });
                    }}
                  />
                </label>
                {index < categoryOptions.length - 1 && (
                  <Separator className="mt-4 mb-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </FilterPopover>
    ),

    showFollowers && (
      <FilterPopover
        key="followers"
        title={
          <div
            className={cn(
              'flex items-center flex-row-reverse gap-1',
              filters.followersNoFrom || filters.followersNoTo
                ? 'text-white'
                : 'text-main-200',
            )}
          >
            {filters.followersNoFrom &&
              `من :${formatFollowersCount(filters.followersNoFrom)}`}
            {filters.followersNoFrom && filters.followersNoTo && ' - '}
            {filters.followersNoTo &&
              `الى :${formatFollowersCount(filters.followersNoTo)}`}
            {!filters.followersNoFrom &&
              !filters.followersNoTo &&
              'عدد المتابعين'}
          </div>
        }
        startIcon={
          (filters.followersNoFrom || filters.followersNoTo) && (
            <div
              onClick={() =>
                setFilters({
                  ...filters,
                  followersNoFrom: '',
                  followersNoTo: '',
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
              value={filters.followersNoFrom}
              onChange={e =>
                setFilters({
                  ...filters,
                  followersNoFrom: e.target.value,
                })
              }
            />
            <Input
              placeholder="500 ألف"
              className="!w-[100px] bg-transparent !text-base"
              value={filters.followersNoTo}
              onChange={e =>
                setFilters({
                  ...filters,
                  followersNoTo: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <p className="text-sm text-white">
                {filters.followersNoFrom || MIN_FOLLOWERS_NO}
              </p>
              <p className="text-sm text-white">
                {filters.followersNoTo || MAX_FOLLOWERS_NO}
              </p>
            </div>

            <Slider
              defaultValue={[MIN_FOLLOWERS_NO]}
              max={MAX_FOLLOWERS_NO}
              step={1}
              dir="rtl"
              value={[
                Number(filters.followersNoFrom),
                Number(filters.followersNoTo),
              ]}
              onValueChange={(vals: number[]) =>
                setFilters({
                  ...filters,
                  followersNoFrom: String(vals[0] ?? 0),
                  followersNoTo: String(vals[1] ?? 0),
                })
              }
            />
          </div>
        </div>
      </FilterPopover>
    ),

    showCountry && (
      <CountryFilter key="country" filters={filters} setFilters={setFilters} />
    ),

    showSorting && (
      <SortingFilter
        key="sorting"
        filters={filters}
        setFilters={setFilters}
        sortingOptions={sortingOptions}
      />
    ),

    showStatus && (
      <FilterPopover
        key="status"
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
    ),
  ].filter(Boolean); // Remove falsy values

  return <div className="flex gap-3 flex-wrap">{filtersToRender}</div>;
};

export default InfluencersTableFilter;
