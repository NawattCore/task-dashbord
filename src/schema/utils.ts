import { z } from 'zod';

// Password validation helpers
export function hasSpecialCharacter(password: string): boolean {
  return /[!@#$%^&*()\-\+={}[\]|\\:;"'<>,.?/~`]/.test(password);
}

export function hasNumber(password: string): boolean {
  return /\d/.test(password);
}

export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password);
}

export function hasLowercase(password: string): boolean {
  return /[a-z]/.test(password);
}

// Password schema generator
export const getPassword = () =>
  z
    .string({
      error: "Password can't be empty",
    })
    .min(8, 'Use at least 8 or more characters')
    .refine(hasSpecialCharacter, {
      message: 'Use at least one special character',
    })
    .refine(hasLowercase, {
      message: 'Use at least one lowercase character',
    })
    .refine(hasNumber, { message: 'Use at least one number' })
    .refine(hasUppercase, {
      message: 'Use at least one uppercase character',
    });

// Email schema generator
export const getEmail = () =>
  z
    .string({
      error: 'برجاء إدخال بريد الكتروني صالح!',
    })
    .min(1, 'برجاء إدخال بريد الكتروني صالح!')
    .email('البريد الالكتروني غير صالح');

// Example usage in a full schema:
