import { z } from 'zod';

import { getEmail } from './utils';

export const authSchema = z.object({
  email: getEmail(),
  password: z
    .string({
      message: 'يجب ادخال كلمة مرور',
    })
    .min(1, { message: 'يجب ادخال كلمة مرور' }),
});

export type AuthSchema = z.infer<typeof authSchema>;
