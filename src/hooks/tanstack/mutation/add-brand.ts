import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; // or your preferred toast library

import { AddBrandSchema } from '@/schema/brands-schema/add-brand-schema';

interface AddBrandResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    brandName: string;
    username: string;
    email: string;
    country: string;
    phoneNumber: string;
    maxInfluencers: number;
    status: string;
    expiryDate: string;
    createdAt: string;
  };
}

export interface AddBrandError {
  message: string;
  field?: keyof AddBrandSchema;
  errors?: Partial<Record<keyof AddBrandSchema, string>>;
}

const addBrand = async (data: AddBrandSchema): Promise<AddBrandResponse> => {
  // Transform the data before sending to API
  // Ensure maxInfluencers is a valid number (data may provide string | number | undefined)
  const parsedMaxInfluencers =
    typeof data.maxInfluencers === 'number'
      ? data.maxInfluencers
      : typeof data.maxInfluencers === 'string'
        ? parseInt(data.maxInfluencers, 10)
        : undefined;

  if (
    parsedMaxInfluencers === undefined ||
    Number.isNaN(parsedMaxInfluencers) ||
    parsedMaxInfluencers < 0
  ) {
    throw {
      message: 'عدد المؤثرين الأقصى مطلوب ويجب أن يكون رقمًا صالحًا',
      field: 'maxInfluencers',
    } as AddBrandError;
  }

  const payload = {
    ...data,
    maxInfluencers: parsedMaxInfluencers,
  };

  const response = await axios.post('/brands', payload);
  return response.data;
};

export const useAddBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddBrandResponse, AddBrandError, AddBrandSchema>({
    mutationFn: addBrand,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('تم إضافة العلامة التجارية بنجاح');
      console.log('Brand added successfully:', data);
    },
    onError: error => {
      toast.error(error.message || 'حدث خطأ أثناء إضافة العلامة التجارية');

      console.error('Error adding brand:', error);
    },
  });
};
