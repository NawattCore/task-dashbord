'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddBrandMutation } from '@/hooks/tanstack/mutation/add-brand';
import {
  addBrandSchema,
  AddBrandSchema,
} from '@/schema/brands-schema/add-brand-schema';
import type { AddBrandError } from '@/hooks/tanstack/mutation/add-brand';

export function useAddBrand() {
  const form = useForm<AddBrandSchema>({
    resolver: zodResolver(addBrandSchema),
    mode: 'all',
    defaultValues: {
      brandName: '',
      username: '',
      email: '',
      country: undefined,
      phoneNumber: undefined,
      maxInfluencers: undefined,
      password: undefined,
      confirmPassword: undefined,
      expiryDate: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = form;

  const addBrandMutation = useAddBrandMutation();

  const onSubmit = (data: AddBrandSchema) => {
    addBrandMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
      onError: (error: AddBrandError) => {
        if (error.field) {
          setError(error.field, {
            type: 'manual',
            message: error.message,
          });
          return;
        }

        // If server sent a map of field errors
        if (error.errors) {
          (
            Object.entries(error.errors) as [
              keyof AddBrandSchema,
              string | undefined,
            ][]
          ).forEach(([field, message]) => {
            if (message) {
              setError(field, { type: 'manual', message });
            }
          });
          return;
        }

        // Fallback: set a generic error on a sensible field
        setError('brandName', {
          type: 'manual',
          message: error.message || 'حدث خطأ أثناء إضافة العلامة التجارية',
        });
      },
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || addBrandMutation.isPending,
    onSubmit,
    apiError: addBrandMutation.error?.message,
    form,
    reset,
  };
}
