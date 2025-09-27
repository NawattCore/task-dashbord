'use client';

import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthSchema } from '@/schema/login-schema';

export const useLoginMutation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return useMutation({
    mutationFn: async (data: AuthSchema) => {
      const result = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          result.error === 'CredentialsSignin'
            ? 'البريد الالكتروني أو كلمة المرور غير صحيح'
            : 'فشل تسجيل الدخول',
        );
      }

      return result;
    },
    onSuccess: () => {
      // Decode the callback URL before redirecting
      const decodedCallbackUrl = decodeURIComponent(callbackUrl);
      router.push(decodedCallbackUrl);
    },
  });
};
