'use client';

import Link from 'next/link';
import { Loader } from 'lucide-react';
import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useState } from 'react';

import { useResetPass } from '@/hooks/forms/use-reset-pass';
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

export function ResetPasswordForm() {
  const {
    handleSubmit,
    isSubmitting,
    onSubmit,
    // apiError,
    errors,
    form,
  } = useResetPass();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center lg:gap-20 gap-12 h-full"
      >
        <div className="flex flex-col items-center gap-5">
          <UnderlinedTitle title="إعادة تعيين كلمة المرور؟" />
          <p className="text-main-mute text-center font-light lg:w-4/5 xl:w-3/5">
            يرجي ادخال كلمة المرور الجديدة ثم اعادة ادخالها مرة اخري لتعديل كلمة
            المرور الخاصه بك
          </p>
        </div>

        <div className="flex flex-col lg:gap-6 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 flex-wrap">
                  <FormLabel>
                    كلمة المرور الجديدة <span className="text-red-500">*</span>
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
          <FormField
            control={form.control}
            name="confirm-password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 flex-wrap">
                  <FormLabel>
                    تأكيد كلمة المرور الجديدة{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="أعد إدخال كلمة المرور"
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                      aria-invalid={!!errors['confirm-password']}
                    />
                    <div
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              !form.watch('password') ||
              !form.watch('confirm-password')
            }
            variant="main"
            className="w-full font-bold mt-16"
          >
            {isSubmitting && <Loader className="mr-2 size-6 animate-spin" />}
            تأكيد
          </Button>
          <Link
            href={routes.login.path}
            className="text-main-200 underline underline-offset-2 self-center"
          >
            العودة لتسجيل الدخول
          </Link>
        </div>
      </form>
    </Form>
  );
}
