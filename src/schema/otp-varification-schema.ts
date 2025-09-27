import * as z from 'zod';

export const createOtpSchema = (otpLength: number) =>
  z.object({
    otp: z
      .string()
      .min(otpLength, `رمز التحقق يجب أن يحتوي على ${otpLength} أرقام`)
      .max(otpLength, `رمز التحقق يجب أن يحتوي على ${otpLength} أرقام`)
      .regex(/^\d+$/, 'رمز التحقق يجب أن يحتوي على أرقام فقط'),
  });
