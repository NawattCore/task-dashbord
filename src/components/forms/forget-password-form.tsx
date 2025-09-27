'use client';

import Link from 'next/link';
import { Loader } from 'lucide-react';

import { useForgetPass } from '@/hooks/forms/use-forget-pass';
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

export function ForgetPasswordForm() {
  const {
    handleSubmit,
    isSubmitting,
    onSubmit,
    // apiError,
    errors,
    form,
  } = useForgetPass();

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center lg:gap-20 gap-12 h-full"
      >
        <div className="flex flex-col items-center gap-5">
          <UnderlinedTitle title="هل نسيت كلمة المرور؟" />
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

          <Button
            type="submit"
            disabled={
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              !form.watch('email')
            }
            variant="main"
            className="w-full font-bold mt-16"
          >
            {isSubmitting && <Loader className="mr-2 size-6 animate-spin" />}
            إرسال رمز التحقق
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
