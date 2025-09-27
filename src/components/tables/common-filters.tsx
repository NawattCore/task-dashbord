import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Country, City, ICountry, ICity } from 'country-state-city';
import { ArrowSwapVertical, CloseCircle, SearchNormal1 } from 'iconsax-reactjs';

import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

import FilterPopover from './filter-popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export const CountryFilter = <T extends { country: string[]; city: string[] }>({
  filters,
  setFilters,
}: {
  filters: T;
  setFilters: Dispatch<SetStateAction<T>>;
}) => {
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  // All countries
  const allCountries: ICountry[] = useMemo(() => Country.getAllCountries(), []);

  // Selected cities based on chosen countries
  const selectedCities: { name: string; countryCode: string }[] =
    useMemo(() => {
      let cities: { name: string; countryCode: string }[] = [];
      filters.country.forEach(code => {
        const c: ICity[] | undefined = City.getCitiesOfCountry(code);
        if (c) {
          cities = [
            ...cities,
            ...c.map(ci => ({ name: ci.name, countryCode: code })),
          ];
        }
      });
      return cities;
    }, [filters.country]);

  // Filtered countries
  const filteredCountries: ICountry[] = allCountries.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  // Filtered cities
  const filteredCities: { name: string; countryCode: string }[] =
    selectedCities.filter(c =>
      c.name.toLowerCase().includes(citySearch.toLowerCase()),
    );

  return (
    <FilterPopover
      title={
        <div
          className={cn(
            'flex items-center flex-row-reverse gap-1',
            filters.country.length > 0 ? 'text-white' : 'text-main-200',
          )}
        >
          <p className="truncate max-w-[200px]">
            {filters.country.length > 0
              ? filters.country.join(', ')
              : 'الدولة / المدينة'}
          </p>
        </div>
      }
      startIcon={
        (filters.country.length > 0 || filters.city.length > 0) && (
          <div
            onClick={() => setFilters({ ...filters, country: [], city: [] })}
          >
            <CloseCircle
              size="42"
              color="#76C5F5"
              className="size-6 max-md:size-5"
            />
          </div>
        )
      }
      contentClassName="p-0"
    >
      <div className="" dir="rtl">
        {/* Country Search */}
        <div className="relative">
          <Input
            placeholder="البحث عن الدولة"
            value={countrySearch}
            onChange={e => setCountrySearch(e.target.value)}
            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-9"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <SearchNormal1 className="size-4 text-white" />
          </div>
        </div>

        {/* Countries */}
        <Separator className="mb-3" />
        <div className="space-y-1 mb-4 max-h-[150px] overflow-y-auto w-[200px] px-3">
          {countrySearch.length !== 0 && filteredCountries.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-white">لا يوجد نتائج</p>
            </div>
          )}
          {filteredCountries.map((c, index) => (
            <div key={`${c.isoCode}-${index}`}>
              <label
                htmlFor={`country-${c.isoCode}`}
                className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
              >
                <span className="ml-auto flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={c.isoCode}
                    svg
                    style={{
                      width: '21px',
                      height: '21px',
                      borderRadius: '2px',
                    }}
                  />
                  {c.name}
                </span>
                <Checkbox
                  id={`country-${c.isoCode}`}
                  checked={filters.country.includes(c.isoCode)}
                  onCheckedChange={(checked: boolean) => {
                    setFilters(prev => {
                      return {
                        ...prev,
                        country: checked
                          ? [...prev.country, c.isoCode]
                          : prev.country.filter(cc => cc !== c.isoCode),
                        city: [], // reset cities when changing countries
                      };
                    });
                  }}
                />
              </label>
              {index < filteredCountries.length - 1 && (
                <Separator className="my-3" />
              )}
            </div>
          ))}
        </div>

        {/* Cities Search */}
        <Separator />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-3 text-white hover:no-underline cursor-pointer">
              المدينة
            </AccordionTrigger>
            <AccordionContent>
              {filters.country.length === 0 && (
                <div className="flex items-center justify-center">
                  <p className="text-white text-center">اختر دولة اولا</p>
                </div>
              )}
              {filters.country.length > 0 && (
                <>
                  <Separator />
                  <div className="relative">
                    <Input
                      placeholder="البحث عن المدينة"
                      value={citySearch}
                      onChange={e => setCitySearch(e.target.value)}
                      className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <SearchNormal1 className="size-4 text-white" />
                    </div>
                  </div>
                  <Separator className="mb-3" />

                  {/* Cities */}
                  <div className="space-y-1 max-h-[150px] overflow-y-auto w-[200px] px-3">
                    {filteredCities.length === 0 && (
                      <div className="flex items-center justify-center">
                        <p className="text-white">لا يوجد نتائج</p>
                      </div>
                    )}

                    {filteredCities.map((ci, index) => (
                      <div key={`${ci.countryCode}-${ci.name}-${index}`}>
                        <label
                          htmlFor={`city-${ci.countryCode}-${ci.name}`}
                          className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                        >
                          <span className="ml-auto">{ci.name}</span>
                          <Checkbox
                            id={`city-${ci.countryCode}-${ci.name}`}
                            checked={filters.city.includes(ci.name)}
                            onCheckedChange={(checked: boolean) => {
                              setFilters(prev => {
                                return {
                                  ...prev,
                                  city: checked
                                    ? [...prev.city, ci.name]
                                    : prev.city.filter(cc => cc !== ci.name),
                                };
                              });
                            }}
                          />
                        </label>
                        {index < filteredCities.length - 1 && (
                          <Separator className="mt-3 mb-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </FilterPopover>
  );
};
export const SortingFilter = <T extends { sorting: string }>({
  filters,
  setFilters,
  sortingOptions,
}: {
  filters: T;
  setFilters: Dispatch<SetStateAction<T>>;
  sortingOptions: {
    label: string;
    values: {
      value: string;
      label: string;
      textColor: string;
    }[];
  };
}) => {
  return (
    <FilterPopover
      title={
        <div
          className={cn(
            'flex items-center flex-row-reverse gap-1',
            sortingOptions.values.find(
              option => option.value === filters.sorting,
            )?.textColor || 'text-main-200',
          )}
        >
          {filters.sorting || sortingOptions.label}
        </div>
      }
      startIcon={
        filters.sorting ? (
          <div onClick={() => setFilters({ ...filters, sorting: '' })}>
            <CloseCircle
              size="42"
              color="#76C5F5"
              className="size-6 max-md:size-5"
            />
          </div>
        ) : (
          <ArrowSwapVertical
            size="42"
            color="#76C5F5"
            className="size-6 max-md:size-5"
          />
        )
      }
    >
      <div className="" dir="rtl">
        <RadioGroup
          defaultValue={filters.sorting}
          className="space-y-1"
          onValueChange={value => {
            const selectedOption = sortingOptions.values.find(
              option => option.value === value,
            );
            if (selectedOption) {
              setFilters({
                ...filters,
                sorting: selectedOption.label,
              });
            }
          }}
        >
          {sortingOptions.values.map((option, index) => (
            <div key={option.value}>
              <label
                htmlFor={option.value}
                className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span className={cn('ml-auto', option.textColor)}>
                  {option.label}
                </span>
              </label>
              {index < sortingOptions.values.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </FilterPopover>
  );
};
