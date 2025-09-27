'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { resetPassSchema, ResetPassSchema } from '@/schema/reset-pass-schema';
import { routes } from '@/config/routes';

// import { useLoginMutation } from '../tanstack/mutation/login-mutation';

export function useResetPass() {
  const router = useRouter();
  const form = useForm<ResetPassSchema>({
    resolver: zodResolver(resetPassSchema),
    mode: 'all',
    defaultValues: {
      password: '',
      'confirm-password': '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setError,
  } = form;

  //   const loginMutation = useLoginMutation();

  const onSubmit = (data: ResetPassSchema) => {
    console.log(data);
    router.push(routes.passwordResetSuccess.path);
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
