import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { srcs } from '@/config/scrs';
import UnderlinedTitle from '@/components/general-components/underlined-title';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const PasswordResetSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 h-full w-full">
      <Image
        src={srcs.SuccessSign}
        alt="password-reset-success"
        width={220}
        height={220}
        className="lg:size-54 sm:size-40 size-32  "
      />
      <div className="flex flex-col items-center gap-5">
        <UnderlinedTitle title="تم تغيير كلمة المرور بنجاح" />
        <p className="text-main-mute text-center font-light lg:w-4/5">
          يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة
        </p>
      </div>
      <Link
        href={routes.login.path}
        className={cn(
          buttonVariants({ variant: 'main_outline_light', size: 'main' }),
          'w-full bg-transparent mt-10',
        )}
      >
        تسجيل الدخول
      </Link>
    </div>
  );
};

export default PasswordResetSuccess;
