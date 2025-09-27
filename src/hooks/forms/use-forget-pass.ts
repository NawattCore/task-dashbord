'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  forgetPassSchema,
  ForgetPassSchema,
} from '@/schema/forget-pass-schema';
import { routes } from '@/config/routes';

// import { useLoginMutation } from '../tanstack/mutation/login-mutation';

export function useForgetPass() {
  const router = useRouter();
  const form = useForm<ForgetPassSchema>({
    resolver: zodResolver(forgetPassSchema),
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setError,
  } = form;

  //   const loginMutation = useLoginMutation();

  const onSubmit = (data: ForgetPassSchema) => {
    console.log(data);
    localStorage.setItem('email', data.email);
    router.push(routes.otpVarification.path);
    // loginMutation.mutate(data, {
    //   onError: (error: Error) => {
    //     setError('email', {
    //       type: 'manual',
    //       message: error.message,
    //     });
    //   },
    // });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting, // || loginMutation.isPending,
    onSubmit,
    apiError: '', // loginMutation.error?.message,
    form,
  };
}
