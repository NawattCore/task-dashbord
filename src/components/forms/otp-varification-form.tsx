'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
import { Loader } from 'lucide-react';

import { routes } from '@/config/routes';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import UnderlinedTitle from '@/components/general-components/underlined-title';
import { useOtpVerification } from '@/hooks/forms/use-otp-varification';

export function OtpVerificationForm() {
  const otpLength = 6;
  const { handleSubmit, onSubmit, errors, form, isSubmitting } =
    useOtpVerification(otpLength);

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center lg:gap-20 gap-12 h-full"
      >
        {/* Title + Email */}
        <div className="flex flex-col items-center gap-5">
          <UnderlinedTitle title="تم إرسال كود التحقق بنجاح" />
          <p className="text-main-mute text-center font-light lg:w-4/5">
            قم بادخال رمز التحقق المرسل اليك علي البريد الالكتروني{' '}
            {email && (
              <span dir="ltr">
                {'******' +
                  email.split('@')[0]?.slice(-4) +
                  '@' +
                  email.split('@')[1]}
              </span>
            )}{' '}
            لإعادة تعيين كلمة المرور
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex flex-col lg:gap-6 gap-4 items-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormMessage className="mx-auto mb-3 text-center" />
                <FormControl>
                  <div
                    className="flex justify-center items-center sm:pb-10 w-full"
                    dir="ltr"
                  >
                    <OtpInput
                      value={field.value || ''} // ✅ use RHF value
                      onChange={field.onChange} // ✅ update RHF
                      numInputs={otpLength}
                      shouldAutoFocus
                      renderSeparator={<span className="hidden" />}
                      renderInput={props => (
                        <input
                          {...props}
                          className={`sm:h-[72px] h-[52px] !w-full max-w-[72px] text-center text-white sm:text-2xl text-xl font-medium 
                            border-1 rounded-xl focus:outline-none bg-transparent 
                            selection:bg-transparent selection:text-white caret-main-300
                            ${
                              errors.otp
                                ? 'border-red-500 focus:border-red-500 caret-red-500'
                                : 'border-[#FFFFFF1A] focus:border-[#ffffffB8] caret-main-300'
                            }`}
                        />
                      )}
                      containerStyle="grid grid-cols-6 sm:gap-4 gap-2 w-full justify-center"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Countdown */}
          <p className="flex items-center gap-2 text-white justify-center">
            00:59
          </p>

          {/* Resend */}
          <div className="flex items-center gap-2 text-white justify-center">
            لم يتم الارسال؟
            <Link
              href={routes.login.path}
              className="text-main-200 underline underline-offset-2 self-center"
            >
              إعادة ارسال الرمز
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="main"
            className="w-full font-bold"
          >
            {isSubmitting && <Loader className="mr-2 size-6 animate-spin" />}
            التحقق من الرمز
          </Button>

          {/* Back */}
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
