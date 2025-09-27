'use client';

import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useState } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';

import { useLogin } from '@/hooks/forms/use-login';
import { routes } from '@/config/routes';

import UnderlinedTitle from '../general-components/underlined-title';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function LoginForm() {
  const {
    handleSubmit,
    isSubmitting,
    onSubmit,
    // apiError,
    errors,
    form,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center lg:gap-20 gap-12 h-full"
      >
        <div className="flex flex-col items-center gap-5">
          <UnderlinedTitle title="تسجيل الدخول" />
          <p className="text-main-mute text-center font-light lg:w-4/5">
            في حال نسيانك لكلمة المرور الخاصه بك قم باعادة كتابة البريد
            الاللكتروني الخاص بك للتحقق منه وارسال OTP
          </p>
        </div>

        <div className="flex flex-col lg:gap-6 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 flex-wrap">
                  <FormLabel>
                    البريد الالكتروني <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="أدخل البريد الاكتروني" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 flex-wrap">
                  <FormLabel>
                    كلمة المرور <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="أدخل كلمة المرور"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      aria-invalid={!!errors.password}
                    />
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlash className="size-5 cursor-pointer text-white" />
                      ) : (
                        <Eye className="size-5 cursor-pointer text-white" />
                      )}
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Link
            href={routes.forgetPassword.path}
            className="text-main-200 self-end underline underline-offset-2"
          >
            هل نسيت كلمة المرور؟
          </Link>

          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            variant="main"
            className="w-full font-bold mt-7"
          >
            {isSubmitting && <Loader className="mr-2 size-6 animate-spin" />}
            تسجيل الدخول
          </Button>
        </div>
      </form>
    </Form>
  );
}
