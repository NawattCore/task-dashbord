'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authSchema, AuthSchema } from '@/schema/login-schema';

import { useLoginMutation } from '../tanstack/mutation/login-mutation';

export function useLogin() {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    mode: 'all',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const loginMutation = useLoginMutation();

  const onSubmit = (data: AuthSchema) => {
    loginMutation.mutate(data, {
      onError: (error: Error) => {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
        setError('password', {
          type: 'manual',
          message: error.message,
        });
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || loginMutation.isPending,
    onSubmit,
    apiError: loginMutation.error?.message,
    form,
  };
}
