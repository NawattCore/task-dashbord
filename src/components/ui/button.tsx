import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none  disabled:text-[#FFFFFF66] disabled:bg-[#FFFFFF1F] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        //main variants
        main: 'bg-main-300 text-white shadow-xs font-normal',
        main_destructive:
          'bg-main-red text-white shadow-xs hover:bg-main-red/90 font-normal',
        main_outline:
          'bg-transparent border border-main-300 text-main-300 shadow-xs font-normal !text-main-300',
        main_outline_destructive:
          'bg-main-red/12 border border-main-red !text-main-red shadow-xs font-normal',
        main_outline_light:
          'bg-main-200/12 border border-main-200 !text-main-200 shadow-xs font-normal',
        main_outline_yellow:
          'bg-main-yellow/12 border border-main-yellow !text-main-yellow shadow-xs font-normal',
        main_outline_cyan:
          'bg-main-cyan/12 border border-main-cyan !text-main-cyan shadow-xs font-normal',
      },
      size: {
        default: 'h-9 px-4 py-2',
        main: 'h-11 px-7 py-2 lg:text-xl md:text-lg text-base rounded-4xl cursor-pointer',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'main',
      size: 'main',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
