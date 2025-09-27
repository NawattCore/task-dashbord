'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
const FilterPopover = ({
  children,
  startIcon,
  title,
  contentClassName,
}: {
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  title: string | React.ReactNode;
  contentClassName?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="main_outline_light"
            className="lg:text-lg md:text-base text-sm bg-transparent"
          >
            <div className="flex items-center gap-3">
              {startIcon && <div className="-mr-2">{startIcon}</div>}
              {title}
            </div>
            <ChevronDown
              className={cn(
                'size-5 -ml-2 transition-all duration-300',
                open && 'rotate-180 ',
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-fit min-w-[170px]', contentClassName)}>
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterPopover;
