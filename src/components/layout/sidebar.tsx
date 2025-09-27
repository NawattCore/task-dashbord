'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CloseCircle, HamburgerMenu, LogoutCurve } from 'iconsax-reactjs';
import { signOut } from 'next-auth/react';

import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { srcs } from '@/config/scrs';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '../ui/button';
import AnimatedCard from './card';
import PopupComponent from '../general-components/Popup-component';
const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
const Sidebar = ({ open }: { open: boolean }) => {
  const pathname = usePathname();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <AnimatedCard
      parentClassName={cn(
        open ? 'w-72' : 'w-18 rounded-4xl',
        'h-full transition-all duration-300',
      )}
      childClassName="flex items-center flex-col pt-12 px-0"
    >
      <Link href={routes.home.path}>
        <Image
          src={srcs.logo}
          alt="logo"
          width={100}
          height={100}
          className="px-3"
        />
      </Link>
      <div
        className={cn(
          'w-full mt-10 flex-col h-full flex justify-between ',
          open ? 'px-5' : 'px-2',
        )}
      >
        <div className="space-y-5 overflow-auto">
          {Object.entries(routes).map(([key, Value]) => {
            const regex = new RegExp(`^${Value.path}(/.*)?$`);
            const isActive = regex.test(pathname);
            const isSideBar = Value.inSideBar;
            if (!isSideBar) return null;

            return (
              <div className="relative" key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      className={cn(
                        'rounded-4xl text-xl h-11 transition-colors',
                        open ? 'ps-7 justify-start w-full' : 'w-fit',
                        isActive
                          ? 'bg-main-300 hover:bg-main-400 font-medium'
                          : 'bg-main-container2 text-white font-light',
                        !open && 'bg-transparent hover:bg-transparent',
                      )}
                      variant="main"
                      size={'default'}
                    >
                      <Link href={Value.path}>
                        <Value.icon
                          variant={isActive ? 'Bold' : 'Linear'}
                          className={cn('size-6', open && 'me-2')}
                        />
                        {open && Value.name}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    className={cn(
                      'flex items-center gap-2 text-base bg-main-container2/70 backdrop-blur-2xl',
                      open ? 'hidden' : '',
                    )}
                    sideOffset={1}
                    side="left"
                  >
                    {Value.name}
                  </TooltipContent>
                </Tooltip>

                {isActive && (
                  <div
                    className={cn(
                      'absolute top-0 w-1 h-full bg-main-400 rounded-e-2xl',
                      open ? '-right-5' : '-right-2',
                    )}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
        <PopupComponent
          isOpen={openPopup}
          onClose={() => setOpenPopup(false)}
          type="error"
          mode="action"
          icon={
            <Image
              src={srcs.AlertDelete}
              alt="logout"
              width={143}
              height={120}
              className="lg:w-[143px] lg:h-[120px] w-[100px] h-[80px]"
            />
          }
          title="هل أنت متأكد من تسجيل الخروج؟"
          subtitle="سيتم إنهاء جلستك الحالية، وقد تحتاج لتسجيل الدخول مرة أخرى للوصول إلى حسابك."
          secondaryButton={{
            comp: 'تسجيل الخروج',
            onClick: handleLogout,
            variant: 'main_destructive',
          }}
          primaryButton={{
            comp: 'الرجوع',
            onClick: () => setOpenPopup(false),
            variant: 'main_outline',
          }}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                'rounded-4xl mb-8 text-xl h-11 transition-colors cursor-pointer',
                open ? 'ps-7 justify-start w-full' : 'w-fit',
                'bg-main-container2 text-main-red font-medium',
                !open && 'bg-transparent hover:bg-transparent',
              )}
              variant="main"
              size={'default'}
              onClick={() => setOpenPopup(true)}
            >
              <LogoutCurve
                variant={'Linear'}
                className={cn('size-6', open && 'me-2')}
              />
              {open && 'تسجيل الخروج'}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className={cn(
              'flex items-center gap-2 text-base backdrop-blur-2xl',
              open ? 'hidden' : '',
            )}
            sideOffset={1}
            side="left"
          >
            تسجيل الخروج
          </TooltipContent>
        </Tooltip>
      </div>
    </AnimatedCard>
  );
};
const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <PopupComponent
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
        type="error"
        mode="action"
        icon={
          <Image
            src={srcs.AlertDelete}
            alt="logout"
            width={143}
            height={120}
            className="lg:w-[143px] lg:h-[120px] w-[100px] h-[80px]"
          />
        }
        title="هل أنت متأكد من تسجيل الخروج؟"
        subtitle="سيتم إنهاء جلستك الحالية، وقد تحتاج لتسجيل الدخول مرة أخرى للوصول إلى حسابك."
        secondaryButton={{
          comp: 'تسجيل الخروج',
          onClick: handleLogout,
          variant: 'main_destructive',
        }}
        primaryButton={{
          comp: 'الرجوع',
          onClick: () => setOpenPopup(false),
          variant: 'main_outline',
        }}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="main"
            size={'icon'}
            className=" rounded-full size-11 cursor-pointer lg:hidden"
          >
            <HamburgerMenu color="#ffffff" className="size-6 rotate-180 " />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#03192D] border-0 overflow-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <Image
                src={srcs.logo}
                alt="logo"
                width={100}
                height={100}
                className="w-12"
              />
              <SheetClose asChild>
                <CloseCircle className="size-6 text-main-red cursor-pointer" />
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <div
            className={'w-full my-10 flex-col h-full flex justify-between px-5'}
          >
            <div className="flex flex-col ">
              {Object.entries(routes).map(([key, Value]) => {
                const regex = new RegExp(`^${Value.path}(/.*)?$`);
                const isActive = regex.test(pathname);
                const isSideBar = Value.inSideBar;

                if (!isSideBar) return null;

                return (
                  <div
                    className="relative text-white border-b border-[#FFFFFF1A] last:border-b-0"
                    onClick={() => {
                      router.push(Value.path);
                      setOpen(false);
                    }}
                    key={key}
                  >
                    <Link
                      href={Value.path}
                      className="flex items-center w-full py-5"
                    >
                      <Value.icon
                        variant={isActive ? 'Bold' : 'Linear'}
                        className={'size-5 me-2'}
                      />
                      {Value.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div
              className="relative text-main-red flex items-center w-full py-5 cursor-pointer font-medium"
              onClick={() => {
                setOpenPopup(true);
                setOpen(false);
              }}
            >
              <LogoutCurve variant={'Linear'} className={'size-5 me-2'} />
              تسجيل الخروج
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export { SidebarMenu, Sidebar };
