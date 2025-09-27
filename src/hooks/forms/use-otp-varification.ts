'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { createOtpSchema } from '@/schema/otp-varification-schema';

export function useOtpVerification(otpLength: number) {
  const schema = createOtpSchema(otpLength);

  type OtpFormValues = z.infer<typeof schema>;

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange', // ✅ validate on change
    reValidateMode: 'onChange', // ✅ revalidate when changing
    defaultValues: { otp: '' },
  });

  const onSubmit = (data: OtpFormValues) => {
    console.log('✅ OTP submitted:', data.otp);
    // your API call here
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit,
    onSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    form,
  };
}
