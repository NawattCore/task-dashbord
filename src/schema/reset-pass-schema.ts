import { z } from 'zod';

export const resetPassSchema = z
  .object({
    password: z.string().min(1, { message: 'يجب ادخال كلمة مرور' }),
    'confirm-password': z.string().min(1, { message: 'يجب تأكيد كلمة المرور' }),
  })
  .refine(data => data.password === data['confirm-password'], {
    message: 'كلمتا المرور يجب ان تكونا متطابقتان',
    path: ['confirm-password'],
  });

export type ResetPassSchema = z.infer<typeof resetPassSchema>;
