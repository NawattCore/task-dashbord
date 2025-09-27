'use client';

import React, { useState } from 'react';
import { Calendar2, Eye, EyeSlash } from 'iconsax-reactjs';
import { Loader } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

import { cn } from '@/lib/utils';
import { useAddBrand } from '@/hooks/forms/brands/use-add-brand';
import type { AddBrandSchema } from '@/schema/brands-schema/add-brand-schema';
import { PhoneInput } from '@/components/general-components/phone-country';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
const AddBrandForm = ({ brandId }: { brandId?: string }) => {
  console.log(brandId);
  const { handleSubmit, isSubmitting, onSubmit, errors, form } = useAddBrand();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Country options
  const countries = [
    {
      value: 'sa',
      label: 'السعودية',
      flag: (
        <ReactCountryFlag
          countryCode={'SA'}
          svg
          style={{
            width: '21px',
            height: '21px',
            borderRadius: '2px',
          }}
        />
      ),
      code: '+966',
    },
    {
      value: 'ae',
      label: 'الإمارات',
      flag: (
        <ReactCountryFlag
          countryCode={'AE'}
          svg
          style={{
            width: '21px',
            height: '21px',
            borderRadius: '2px',
          }}
        />
      ),
      code: '+971',
    },
    {
      value: 'eg',
      label: 'مصر',
      flag: (
        <ReactCountryFlag
          countryCode={'EG'}
          svg
          style={{
            width: '21px',
            height: '21px',
            borderRadius: '2px',
          }}
        />
      ),
      code: '+20',
    },
    {
      value: 'jo',
      label: 'الأردن',
      flag: (
        <ReactCountryFlag
          countryCode={'JO'}
          svg
          style={{
            width: '21px',
            height: '21px',
            borderRadius: '2px',
          }}
        />
      ),
      code: '+962',
    },
  ];

  // Status options
  const statusOptions = [
    { value: 'active', label: 'نشط' },
    { value: 'inactive', label: 'غير نشط' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-2 text-right">
        <div className="text-xl text-white font-medium max-md:text-[16px]">
          بيانات الحساب
        </div>
        <div className="text-sm text-gray-400 max-md:text-sm font-light">
          الحملات التي تم إطلاقها في العام الحالي
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full min-w-0">
            {/* Username */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>
                      اسم المستخدم <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="اسم المستخدم"
                      {...field}
                      className="text-right w-full min-w-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Brand Name */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>
                      اسم العلامة التجارية{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="اسم العلامة التجارية"
                      {...field}
                      className="text-right w-full min-w-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="البريد الإلكتروني"
                      type="email"
                      {...field}
                      className="text-right w-full min-w-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <PhoneInput
                      international={false}
                      defaultCountry="SA"
                      placeholder="رقم الهاتف"
                      value={field.value ?? ''}
                      onChange={val => field.onChange(val || undefined)}
                      className="text-right flex w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>الدولة</FormLabel>
                    <FormMessage />
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    dir="rtl"
                  >
                    <FormControl>
                      <SelectTrigger className="text-right w-full">
                        <SelectValue placeholder="اسم الدولة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country.value} value={country.value}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Max Influencers */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="maxInfluencers"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>أقصى عدد مؤثرين</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="(50)"
                      type="number"
                      {...field}
                      className="text-right w-full min-w-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="  كلمة المرور"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        className="text-right w-full min-w-0"
                        aria-invalid={!!errors.password}
                      />
                      <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlash className="size-5 cursor-pointer text-white" />
                        ) : (
                          <Eye className="size-5 cursor-pointer text-white" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="تأكيد كلمة المرور"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                        className="text-right w-full min-w-0"
                        aria-invalid={!!errors.confirmPassword}
                      />
                      <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeSlash className="size-5 cursor-pointer text-white" />
                        ) : (
                          <Eye className="size-5 cursor-pointer text-white" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Expiry Date */}
            <FormField<AddBrandSchema>
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>تاريخ انتهاء الصلاحية </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="default"
                          className={cn(
                            'w-full bg-main-container2 flex items-center justify-between flex-row-reverse h-12 !p-3 rounded-lg border border-[#FFFFFF1A]',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <Calendar2
                            color="#1DA1F2"
                            variant="Bold"
                            className="mr-2 size-6"
                          />
                          {field.value ? (
                            <span className="text-white">
                              {new Date(field.value).toLocaleDateString(
                                'en-EG',
                              )}
                            </span>
                          ) : (
                            <span className="text-sm text-[#7c8c9a]">
                              اختر تاريخ انتهاء الصلاحية
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={date =>
                            field.onChange(
                              date ? date.toISOString() : undefined,
                            )
                          }
                          initialFocus
                          className="rounded-lg"
                          disabled={date => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Status - Fixed */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3 flex-wrap text-right">
                    <FormLabel>الحالة</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <RadioGroup
                      className="bg-main-container2 px-3 py-3 min-h-12 flex flex-wrap items-center justify-end gap-3 sm:gap-4 md:gap-6 lg:gap-8 rounded-lg border border-[#FFFFFF1A] !overflow-x-hidden"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      {statusOptions.map(status => (
                        <div
                          key={status.value}
                          className="flex items-center shrink-0"
                        >
                          <label
                            htmlFor={status.value}
                            className="flex items-center gap-2 text-sm cursor-pointer text-white whitespace-nowrap select-none"
                          >
                            <RadioGroupItem
                              value={status.value}
                              id={status.value}
                            />
                            <span>{status.label}</span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              variant="main"
              className="w-[170px] font-medium"
            >
              {isSubmitting && <Loader className="mr-2 size-6 animate-spin" />}
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddBrandForm;
