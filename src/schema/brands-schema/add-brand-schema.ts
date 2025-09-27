import { z } from 'zod';

export const addBrandSchema = z

  .object({
    brandName: z
      .string()
      .min(1, 'اسم العلامة التجارية مطلوب')
      .min(2, 'اسم العلامة التجارية يجب أن يكون على الأقل حرفين')
      .max(100, 'اسم العلامة التجارية لا يمكن أن يتجاوز 100 حرف'),

    username: z
      .string()
      .min(1, 'اسم المستخدم مطلوب')
      .min(3, 'اسم المستخدم يجب أن يكون على الأقل 3 أحرف')
      .max(50, 'اسم المستخدم لا يمكن أن يتجاوز 50 حرف')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط',
      ),

    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('البريد الإلكتروني غير صحيح'),

    country: z.string().optional(),

    phoneNumber: z
      .string()
      .min(1, 'رقم الهاتف مطلوب')
      .regex(/^[+]?[0-9\s-()]+$/, 'رقم الهاتف غير صحيح')
      .min(8, 'رقم الهاتف قصير جداً')
      .max(20, 'رقم الهاتف طويل جداً')
      .optional(),
    maxInfluencers: z
      .string()
      .regex(/^\d+$/, 'يجب أن يكون رقماً')
      .refine(val => parseInt(val) > 0, 'العدد يجب أن يكون أكبر من صفر')
      .refine(val => parseInt(val) <= 1000, 'العدد لا يمكن أن يتجاوز 1000')
      .optional(),

    password: z
      .string()
      .min(1, 'كلمة المرور مطلوبة')
      .min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم',
      )
      .optional(),
    confirmPassword: z.string().optional(),

    status: z.string().min(1, 'الحالة مطلوبة').optional(),

    expiryDate: z
      .string()
      .refine(date => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate > today;
      }, 'تاريخ انتهاء الصلاحية يجب أن يكون في المستقبل')
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'كلمتان المرور غير متطابقتان',
    path: ['confirmPassword'],
  });

export type AddBrandSchema = z.infer<typeof addBrandSchema>;
