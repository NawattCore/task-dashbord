import { z } from 'zod';

import { getEmail } from './utils';

export const forgetPassSchema = z.object({
  email: getEmail(),
});

export type ForgetPassSchema = z.infer<typeof forgetPassSchema>;
