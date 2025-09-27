'use client';

import React, { useEffect, useState } from 'react';
import { Grid4, LogoutCurve, Profile, Profile2User } from 'iconsax-reactjs';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Sidebar, SidebarMenu } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { useOpenSidebar } from '@/context/use-open-sidebar';
import { srcs } from '@/config/scrs';
import FilterPopover from '@/components/tables/filter-popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PopupComponent from '@/components/general-components/Popup-component';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useOpenSidebar();
  const [openPopup, setOpenPopup] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  // Guard: if not authenticated on client, send to login to avoid infinite loader
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className={`py-5 bg-main-bg h-screen flex gap-5 lg:px-5 px-3`}>
      <div className="max-lg:hidden">
        <Sidebar open={isSidebarOpen} />
      </div>
      <div className="flex-1 space-y-5">
        <div className="lg:px-10 px-3 py-3 rounded-4xl bg-main-container flex items-center justify-between">
          <Button
            variant="main"
            size={'icon'}
            className=" rounded-full size-11 cursor-pointer max-lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Grid4
              color="#ffffff"
              className="size-6 rotate-180 "
              variant="Bold"
            />
          </Button>
          <div className="flex items-center gap-2 lg:hidden">
            <SidebarMenu />
            <Image
              src={srcs.logo}
              alt="logo"
              width={100}
              height={100}
              className="w-8"
            />
          </div>
          <div className="items-center gap-2 bg-main-container2 py-2.5 px-5 rounded-3xl text-main-200 hidden lg:flex">
            <Profile2User variant="Bold" className="size-6" />
            فريق التنفيذ
          </div>
          <FilterPopover
            title="أسامة عاطف"
            startIcon={
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>أ ع </AvatarFallback>
              </Avatar>
            }
          >
            <div className="w-[180px] space-y-4">
              <div className="flex items-center gap-2 text-white">
                <Profile className="size-6" />
                الملف الشخصي
              </div>
              <Separator />
              <div
                className="flex items-center gap-2 text-[#FF3F43] font-medium cursor-pointer"
                onClick={() => setOpenPopup(true)}
              >
                <LogoutCurve className="size-6" />
                تسجيل الخروج
              </div>
            </div>
          </FilterPopover>
        </div>
        <div className="h-[calc(100dvh-130px)] overflow-y-auto pl-2">
          {status === 'loading' ? (
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
              <Image
                src={srcs.logo}
                alt="logo"
                width={100}
                height={100}
                className=" animate-bounce"
              />
            </div>
          ) : (
            children
          )}
        </div>
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
    </div>
  );
};

export default DashboardLayout;
