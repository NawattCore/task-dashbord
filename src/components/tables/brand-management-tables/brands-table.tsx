'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PaginationState, RowSelectionState } from '@tanstack/react-table';
import { CloseCircle, Edit2,Trash } from 'iconsax-reactjs';
import { useForm } from 'react-hook-form';

import type { RootState } from '@/store';
import type { BrandUser } from '@/store/users-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUser, deleteUser, updateUser } from '@/store/users-slice';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOpenSidebar } from '@/context/use-open-sidebar';
import SimpleTable, { SimpleColumn } from '@/components/tables/simple-table';
import { srcs } from '@/config/scrs';
import { cn } from '@/lib/utils';
import PopupComponent from '@/components/general-components/Popup-component';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import FilterPopover from '../filter-popover';

// Status enum for better type safety
enum BrandStatus {
  ACTIVE = 'نشط',
  INACTIVE = 'غير نشط',
  PENDING = 'في الانتظار',
}

interface User {
  id: string;
  id2?: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  createdAt: string;
  brandName: string;
  brandCode: string;
  arabicName: string;
  englishName: string;
  username: string;
  [key: string]: unknown;
}

type UserFormValues = {
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  createdAt: string;
  brandName: string;
  brandCode: string;
  arabicName: string;
  englishName: string;
  username: string;
};

// Status configuration for styling and behavior
const statusConfig = {
  [BrandStatus.ACTIVE]: {
    color: '#89FF7E',
    bgColor: '#89FF7E14',
    value: 'active',
  },
  [BrandStatus.INACTIVE]: {
    color: '#9CA3AF',
    bgColor: '#9CA3AF26',
    value: 'inactive',
  },
  [BrandStatus.PENDING]: {
    color: '#F59E0B',
    bgColor: '#F59E0B14',
    value: 'pending',
  },
};

export default function BrandsTable() {
  const [selectedStatus, setSelectedStatus] = useState('الحالة');
  const [deleteBrandPopup, setDeleteBrandPopup] = useState(false);
  const { isSidebarOpen } = useOpenSidebar();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // Redux store
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    // Map selected Arabic status label to internal value
    let statusFilter: 'active' | 'inactive' | 'pending' | null = null;
    if (selectedStatus === BrandStatus.ACTIVE) statusFilter = 'active';
    else if (selectedStatus === BrandStatus.INACTIVE) statusFilter = 'inactive';
    else if (selectedStatus === BrandStatus.PENDING) statusFilter = 'pending';

    return users.filter(u => {
      const matchesStatus = statusFilter ? u.status === statusFilter : true;
      if (!term) return matchesStatus;
      const hay = `${u.englishName} ${u.arabicName} ${u.brandName}`.toLowerCase();
      return matchesStatus && hay.includes(term);
    });
  }, [users, selectedStatus, searchTerm]);

  const addForm = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      status: 'active',
      role: 'user',
      createdAt: new Date().toLocaleDateString('ar-EG'),
      brandName: '',
      brandCode: '',
      arabicName: '',
      englishName: '',
      username: '',
    },
    mode: 'onChange',
  });

  const editForm = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      email: '',
      status: 'active',
      role: 'user',
      createdAt: new Date().toLocaleDateString('ar-EG'),
      brandName: '',
      brandCode: '',
      arabicName: '',
      englishName: '',
      username: '',
    },
    mode: 'onChange',
  });

  const columns: SimpleColumn<User>[] = [
    {
      key: 'englishName',
      header: 'اسم العلامة التجارية',
      size: 170,
      render: (value, row) => (
        <Link
          href={`/brand/${row.id}`}
          className="flex items-center justify-center gap-1"
        >
          <Image src={srcs.logo} width={20} height={20} alt="Image" />
          <span className="underline underline-offset-2">
            {row.englishName}
          </span>
        </Link>
      ),
    },
    {
      key: 'arabicName',
      header: 'اسم المستخدم',
      size: 150,
    },
    {
      key: 'brandName',
      header: 'اسم الشركة',
      size: 200,
    },
    {
      key: 'username',
      header: 'الرقم المختصر',
      size: 120,
    },
    {
      key: 'brandCode',
      header: (
        <Tooltip>
          <TooltipTrigger>الرقم المقبول</TooltipTrigger>
          <TooltipContent className="p-6 " side="bottom">
            <p>
              عدد المؤثرين الذين تم ارسال لهم رمز QR Code للدعوة لزيارة الBrand.
            </p>
          </TooltipContent>
        </Tooltip>
      ),
      size: 120,
    },
    {
      key: 'email',
      header: 'البريد الالكتروني',
      size: 180,
    },
    {
      key: 'createdAt',
      header: 'تاريخ انتهاء الصلاحية',
      size: 160,
    },
    {
      key: 'name',
      header: 'الحالة',
      size: 120,
      render: (value, row) => (
        <div className="flex items-center justify-center">
          <span
            className={`min-w-[115px] flex items-center justify-center gap-1.5 px-1 lg:py-px py-1.5  rounded-full text-lg max-md:text-sm ${
              row.status === 'active'
                ? 'bg-main-green/15 text-main-green'
                : row.status === 'inactive'
                  ? 'bg-[#9CA3AF]/15 text-[#9CA3AF]'
                  : 'bg-[#FACC1526] text-[#FACC15]'
            }`}
          >
            <span
              className={`rounded-full w-2 h-2 block  ${
                row.status === 'active'
                  ? 'bg-main-green'
                  : row.status === 'inactive'
                    ? 'bg-[#9CA3AF]'
                    : 'bg-[#FACC15]'
              }`}
            />
            {row.status === 'active'
              ? 'نشط'
              : row.status === 'inactive'
                ? 'غير نشط'
                : 'في الانتظار'}
          </span>
        </div>
      ),
    },
    {
      key: 'id',
      header: 'الاجراءات',
      size: 150,
      render: (value, row) => (
        <div className="flex space-x-2 items-center justify-center">
          <div
            onClick={() => {
              setEditingUser(row);
              editForm.reset({
                name: row.name,
                email: row.email,
                status: row.status,
                role: row.role,
                createdAt: row.createdAt,
                brandName: row.brandName,
                brandCode: row.brandCode,
                arabicName: row.arabicName,
                englishName: row.englishName,
                username: row.username,
              });
              setIsEditOpen(true);
            }}
            className="bg-[#76C5F5]/15 p-2 rounded-full cursor-pointer hover:bg-[#76C5F5]/25 transition-colors"
          >
            <Edit2 size="22" color="#76C5F5" variant="Bold" />
          </div>
          <div
            onClick={() => {
              // Immediate delete from Redux store
              dispatch(deleteUser(row.id));
            }}
            className="bg-[#FF3F43]/15 p-2 rounded-full cursor-pointer hover:bg-[#FF3F43]/25 transition-colors"
          >
            <Trash size="22" color="#FF3F43" variant="Bold" />
          </div>
        </div>
      ),
    },
  ];

  const handleStatusChange = (value: string) => {
    const statusMap: Record<string, string> = {
      active: BrandStatus.ACTIVE,
      inactive: BrandStatus.INACTIVE,
      pending: BrandStatus.PENDING,
    };
    setSelectedStatus(statusMap[value] || 'الحالة');
  };

  useEffect(() => {
    console.log('rowSelection rowSelection', rowSelection);
  }, [rowSelection]);

  return (
    <div>
      <div className="flex justify-end p-2">
        <Button
          variant={viewMode === 'table' ? 'main_outline' : 'main'}
          onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
          className="rounded-3xl"
        >
          {viewMode === 'table' ? 'عرض كبطاقات' : 'عرض كجدول'}
        </Button>
        <Button
          variant={'main'}
          onClick={() => setIsAddOpen(true)}
          className="rounded-3xl mr-2"
        >
          إضافة علامة
        </Button>
      </div>

      {viewMode === 'table' ? (
        <SimpleTable<User>
        customHeader={true}
        data={filteredUsers}
        columns={columns}
        searchable={false} // Disable search
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        pagination={pagination}
        onPaginationChange={setPagination}
        selectable={true}
        bulkSelect={true}
        onSelectionChange={selected => {
          console.log('Selected users:', selected);
        }}
        styles={{
          container: 'rounded-xl border-[#FFFFFF1A] border',
          table: `border-t-0 rounded-tl-0 rounded-tr-0 text-center bg-[var(--main-container)] transition-all duration-300 ${isSidebarOpen ? 'lg:w-[calc(100dvw-360px)] w-[calc(100dvw-40px)]' : 'lg:w-[calc(100dvw-145px)] w-[calc(100dvw-40px)]'}`,
          header:
            'bg-[var(--main-container)] !text-center [&_tr]:border-b-0 hover:!bg-transparent',
          headerCell:
            'text-[var(--color-main-mute)] !text-center hover:!bg-transparent text-base',
          row: 'transition-all duration-200 align-middle [&:nth-child(odd)]:bg-[var(--main-bg)] border-b-0 [&:nth-child(even)]:bg-[var(--main-container)]',
          cell: 'text-white !text-center text-lg py-3 max-md:text-sm',
          selectedRow: '',
          pagination:
            'bg-[var(--main-bg)] py-4 rounded-lg flex flex-wrap gap-3',
          pageSize: 'text-white',
        }}
        stickyHeader={true}
      >
        <div className="flex justify-between items-center px-4 py-4 flex-wrap gap-5">
          {/* Title Section */}
          <div className="text-white text-2xl max-md:text-lg">
            جميع العلامات التجارية{' '}
            <span className="lg:text-lg md:text-base text-sm font-light !text-[var(--color-main-mute)]">
              ({filteredUsers.length}/{users.length})
            </span>
          </div>
              <div className="flex items-center gap-3 flex-wrap">
              <FilterPopover
                title={
                  <div
                    className={cn(
                      'flex items-center flex-row-reverse gap-1',
                      selectedStatus !== 'الحالة'
                        ? `text-[${statusConfig[selectedStatus as BrandStatus]?.color}]`
                        : 'text-main-200',
                    )}
                    style={{
                      color: statusConfig[selectedStatus as BrandStatus]?.color,
                    }}
                  >
                    {selectedStatus}
                    {selectedStatus !== 'الحالة' && (
                      <div
                        className={cn('w-2 h-2 rounded-full')}
                        style={{
                          backgroundColor:
                            statusConfig[selectedStatus as BrandStatus]?.color,
                        }}
                      ></div>
                    )}
                  </div>
                }
                startIcon={
                  selectedStatus !== 'الحالة' && (
                    <div onClick={() => setSelectedStatus('الحالة')}>
                      <CloseCircle
                        size="42"
                        color="#76C5F5"
                        className="size-6 max-md:size-5 cursor-pointer"
                      />
                    </div>
                  )
                }
              >
                <div className="" dir="rtl">
                  <RadioGroup
                    value={
                      statusConfig[selectedStatus as BrandStatus]?.value || ''
                    }
                    className="space-y-1"
                    onValueChange={handleStatusChange}
                  >
                    {Object.entries(statusConfig).map(
                      ([status, config], index) => (
                        <div key={status}>
                          <label
                            htmlFor={config.value}
                            className="flex items-center gap-3 text-sm cursor-pointer rounded-lg transition-colors text-white flex-row-reverse"
                          >
                            <RadioGroupItem
                              value={config.value}
                              id={config.value}
                            />
                            <div
                              className={cn('w-2 h-2 rounded-full')}
                              style={{ backgroundColor: config.color }}
                            ></div>
                            <span
                              className={cn('ml-auto')}
                              style={{ color: config.color }}
                            >
                              {status}
                            </span>
                          </label>
                          {index !== Object.entries(statusConfig).length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ),
                    )}
                  </RadioGroup>
                </div>
              </FilterPopover>

              <Input
                placeholder="ابحث بالاسم أو الشركة"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-64 max-sm:w-full"
              />
            </div>
         </div>
        <PopupComponent
          isOpen={deleteBrandPopup}
          onClose={() => setDeleteBrandPopup(false)}
          type="success"
          mode="action"
          icon={
            <Image
              src={srcs.AlertDelete}
              alt="AlertDelete"
              width={150}
              height={150}
              className="lg:w-[143px] lg:h-[120px] w-[100px] h-[80px]"
            />
          }
          title="هل أنت متأكد من حذف العلامة التجارية؟"
          subtitle="إذا قمت بحذف العلامة التجارية لن تستطيع إرجاع أي بيانات خاصة بها مرة أخرى"
          primaryButton={{
            comp: 'الرجوع',
            variant: 'main_outline',
            onClick: () => {
              console.log('Retrying...');
            },
          }}
          secondaryButton={{
            comp: 'حذف',
            variant: 'main_destructive',
            onClick: () => setDeleteBrandPopup(false),
          }}
        />
        <PopupComponent
          isOpen={false}
          onClose={() => console.log('SuccessSign')}
          type="success"
          mode="viewinfo"
          icon={
            <Image
              src={srcs.SuccessSign}
              alt="SuccessSign"
              width={150}
              height={150}
              className="lg:w-[150px] lg:h-[150px] w-[100px] h-[100px]"
            />
          }
          title="تم حذف العلامة التجارية بنجاح!"
          subtitle="تم حذف العلامة التجارية بنجاح"
        />
      </SimpleTable>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
          {filteredUsers.map((u: User) => (
            <div key={u.id} className="rounded-xl border border-[#FFFFFF1A] bg-[var(--main-container)] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={srcs.logo} width={24} height={24} alt="logo" />
                  <div className="text-white font-semibold">{u.englishName}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${u.status === 'active' ? 'bg-main-green/15 text-main-green' : u.status === 'inactive' ? 'bg-[#9CA3AF]/15 text-[#9CA3AF]' : 'bg-[#FACC1526] text-[#FACC15]'}`}>{u.status === 'active' ? 'نشط' : u.status === 'inactive' ? 'غير نشط' : 'في الانتظار'}</span>
              </div>
              <div className="text-[var(--color-main-mute)] text-sm">{u.brandName}</div>
              <div className="flex flex-wrap gap-2 text-sm text-white/80">
                <span>الكود: {u.brandCode}</span>
                <span>المستخدم: {u.arabicName}</span>
                <span>البريد: {u.email}</span>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant={'main_outline'} className="rounded-full px-3 py-1">
                  <Edit2 size="18" />
                </Button>
                <Button
                  variant={'main_outline_destructive'}
                  className="rounded-full px-3 py-1"
                  onClick={() => dispatch(deleteUser(u.id))}
                >
                  <Trash size="18" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add User Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة علامة تجارية</DialogTitle>
          </DialogHeader>
          <Form {...addForm}>
            <form
              onSubmit={addForm.handleSubmit(values => {
                const newUser: BrandUser = {
                  id: Date.now().toString(),
                  id2: values.brandCode,
                  ...values,
                };
                dispatch(addUser(newUser));
                setIsAddOpen(false);
                addForm.reset();
              })}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <FormField
                control={addForm.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم العلامة (انجليزي)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="arabicName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>اسم الشركة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="brandCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم المقبول</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم المختصر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الالكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ انتهاء الصلاحية</FormLabel>
                    <FormControl>
                      <Input placeholder="DD-MM-YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدور</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحالة</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(val: 'active' | 'inactive' | 'pending') => field.onChange(val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">نشط</SelectItem>
                          <SelectItem value="inactive">غير نشط</SelectItem>
                          <SelectItem value="pending">في الانتظار</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:col-span-2">
                <Button type="submit" variant="main" className="w-full">
                  حفظ
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل العلامة التجارية</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(values => {
                if (!editingUser) return;
                const updated: BrandUser = {
                  ...editingUser,
                  ...values,
                };
                dispatch(updateUser(updated));
                setIsEditOpen(false);
                setEditingUser(null);
              })}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <FormField
                control={editForm.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم العلامة (انجليزي)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="arabicName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>اسم الشركة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="brandCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم المقبول</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم المختصر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الالكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ انتهاء الصلاحية</FormLabel>
                    <FormControl>
                      <Input placeholder="DD-MM-YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدور</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحالة</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={val => field.onChange(val as string)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">نشط</SelectItem>
                          <SelectItem value="inactive">غير نشط</SelectItem>
                          <SelectItem value="pending">في الانتظار</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="sm:col-span-2">
                <Button type="submit" variant="main" className="w-full">
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
