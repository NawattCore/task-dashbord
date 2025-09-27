'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { ArrowDown2 } from 'iconsax-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.ComponentProps<'input'>,
  'onChange' | 'value' | 'ref'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    'aria-invalid'?: boolean;
  };

/**
 * PhoneInput wrapper:
 * - wrapper owns the border & focus ring (so input + button appear as one control)
 * - Input and Button are rendered borderless (so there's no double-thick border)
 * - divider element placed inside the Button (left edge) to visually separate the two parts
 */
const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(
  (
    { className, onChange, value, 'aria-invalid': ariaInvalid, ...props },
    ref,
  ) => {
    // Memoize the onChange handler to prevent unnecessary re-renders
    const handleChange = React.useCallback(
      (value: RPNInput.Value | undefined) => {
        onChange?.(value || ('' as RPNInput.Value));
      },
      [onChange],
    );

    return (
      <div
        className={cn(
          'relative group flex items-center rounded-xl bg-transparent',
          'border border-primary/20',
          'focus-within:border-none overflow-hidden border-[#FFFFFF1A] border-[1px] ',
          ariaInvalid ? 'border-destructive ring-destructive/10' : '',
          className,
        )}
      >
        {/* focus-within:ring-accent focus-within:ring-[3px] focus-within:outline-none */}
        <RPNInput.default
          ref={ref}
          className="flex flex-row-reverse flex-1 bg-main-container2 rounded-lg "
          flagComponent={MemoizedFlagComponent}
          countrySelectComponent={MemoizedCountrySelect}
          inputComponent={MemoizedInputComponent}
          smartCaret={false}
          value={value || undefined}
          aria-invalid={ariaInvalid}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { 'aria-invalid'?: boolean }
>(({ className, 'aria-invalid': ariaInvalid, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      dir="rtl"
      aria-invalid={ariaInvalid}
      {...props}
      className={cn(
        'border-0 bg-transparent !text-white',
        'rounded-e-none rounded-s-xl',
        'focus-visible:ring-0 focus-within:ring-0',
        className,
      )}
    />
  );
});
InputComponent.displayName = 'InputComponent';

// Memoize InputComponent to prevent unnecessary re-renders
const MemoizedInputComponent = React.memo(InputComponent);

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  ariaInvalid?: boolean;
};

/**
 * CountrySelect:
 * - Button is borderless (wrapper owns border)
 * - Divider element is placed absolutely at the left edge of the button
 * - Button reacts visually to wrapper's focus-within via group-focus-within classes
 * - ariaInvalid toggles destructive text color
 */
const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  ariaInvalid,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      setSearchValue('');
    }
  }, []);

  const handleSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const viewportElement = scrollAreaRef.current.querySelector(
          '[data-radix-scroll-area-viewport]',
        );
        if (viewportElement) {
          // reset scroll to top when searching
          (viewportElement as HTMLElement).scrollTop = 0;
        }
      }
    }, 0);
  }, []);

  // Memoize filtered country list to prevent unnecessary recalculations
  const filteredCountryList = React.useMemo(() => {
    if (!searchValue) return countryList;
    return countryList.filter(({ label }) =>
      label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [countryList, searchValue]);

  // Memoize country calling code to prevent unnecessary recalculations
  const countryCallingCode = React.useMemo(() => {
    return selectedCountry
      ? `+${RPNInput.getCountryCallingCode(selectedCountry)}`
      : 'اختر الدولة';
  }, [selectedCountry]);

  return (
    <Popover open={isOpen} modal onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {/* Button visually appears as part of the wrapper: borderless, transparent */}
        <Button
          dir="ltr"
          type="button"
          variant="default"
          size="lg"
          className={cn(
            'relative !bg-main-container !text-white z-10 flex items-center gap-3 px-3 min-w-[96px]',
            'my-auto ml-6 rounded-full',
            'border-0 bg-transparent',
            'group-focus-within:text-white',
            ariaInvalid ? 'text-destructive' : '',
            'focus-visible:ring-0 outline-none',
          )}
          disabled={disabled}
        >
          {/* vertical divider between input & button (keeps the "split" look) */}
          <span
            aria-hidden
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[0.6px] w-[1px] h-11 bg-primary/20',
            )}
          />

          <ArrowDown2
            strokeWidth="3"
            className={cn(
              'size-4 transition-transform text-white',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
            color="white"
            size={20}
          />
          <MemoizedFlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <p
            className={cn(
              'font-light text-white',
              ariaInvalid ? 'text-destructive' : '',
            )}
          >
            {countryCallingCode}
          </p>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0 ">
        <Command className="!bg-main-container2 border border-main-container ">
          <CommandInput
            value={searchValue}
            onValueChange={handleSearchChange}
            placeholder="ابحث عن دولة..."
          />
          <CommandList>
            <div ref={scrollAreaRef} className="h-72 overflow-auto ">
              <CommandEmpty>لا توجد نتائج.</CommandEmpty>
              <CommandGroup>
                {filteredCountryList.map(({ value, label }) =>
                  value ? (
                    <MemoizedCountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={handleOpenChange}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Memoize CountrySelect to prevent unnecessary re-renders
const MemoizedCountrySelect = React.memo(CountrySelect);

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: (open: boolean) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  // Memoize handlers to prevent unnecessary re-renders
  const handleSelect = React.useCallback(() => {
    onChange(country);
    onSelectComplete(false);
  }, [country, onChange, onSelectComplete]);

  // Memoize country calling code to prevent unnecessary recalculations
  const countryCallingCode = React.useMemo(() => {
    return `+${RPNInput.getCountryCallingCode(country)}`;
  }, [country]);

  // Memoize check icon opacity to prevent unnecessary recalculations
  const checkIconOpacity = React.useMemo(() => {
    return country === selectedCountry ? 'opacity-100' : 'opacity-0';
  }, [country, selectedCountry]);

  return (
    <CommandItem
      className="gap-2 !bg-main-container2 !text-white"
      onSelect={handleSelect}
    >
      <MemoizedFlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm ">{countryCallingCode}</span>
      <CheckIcon className={`ml-auto size-4 ${checkIconOpacity}`} />
    </CommandItem>
  );
};

// Memoize CountrySelectOption to prevent unnecessary re-renders
const MemoizedCountrySelectOption = React.memo(CountrySelectOption);

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-[2px] bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

// Memoize FlagComponent to prevent unnecessary re-renders
const MemoizedFlagComponent = React.memo(FlagComponent);

export { PhoneInput };
