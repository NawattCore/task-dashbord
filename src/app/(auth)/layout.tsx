import Image from 'next/image';
import React from 'react';

import { srcs } from '@/config/scrs';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-main-bg grid lg:grid-cols-2 gap-10 bg-cover bg-center bg-no-repeat lg:p-12 md:p-6 p-4"
      style={{ backgroundImage: `url(${srcs.loginBg})` }}
    >
      <div className="md:p-12 p-6 bg-main-container rounded-xl border border-[#FFFFFF1A] w-full ">
        {children}
      </div>
      {/* Right Side with Smoke + Logo */}
      <div className="relative flex items-center justify-center max-lg:hidden">
        {/* Logo */}
        <Image
          src={srcs.logoLogin}
          alt="logo"
          width={410}
          height={746}
          className="relative z-10 w-150"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
