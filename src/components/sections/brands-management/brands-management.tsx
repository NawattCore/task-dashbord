'use client';

import React, { useCallback, useState } from 'react';
import {
  Add,
  Export,
  Import,
  MedalStar,
  ProfileDelete,
  ProfileTick,
} from 'iconsax-reactjs';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
 import StatsCard from '@/components/general-components/states-card';
import TitlePage from '@/components/general-components/title-page';
import PopupComponent from '@/components/general-components/Popup-component';
import UploadComponent from '@/components/general-components/upload-component';
import BrandsTable from '@/components/tables/brand-management-tables/brands-table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUser, type BrandUser } from '@/store/users-slice';

const BrandsManagement = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  const statcardDetails = [
    {
      icon: <MedalStar variant="Bold" />,
      title: '170',
      subtitle: 'عدد العلامات التجارية المسجلة',
      color: '#931AE3',
    },
    {
      icon: <ProfileTick variant="Bold" />,
      title: '150',
      subtitle: 'عدد العلامات التجارية المفعلة',
      color: '#46D55B',
    },
    {
      icon: <ProfileDelete variant="Bold" />,
      title: '10',
      subtitle: 'عدد العلامات التجارية المعطلة',
      color: '#FF3F43',
    },
  ];

  const toCsv = useCallback(
    <T extends Record<string, unknown>>(rows: T[], headers?: (keyof T)[]) => {
      if (!rows || rows.length === 0) return '';
      const first = rows[0] as T;
      const cols = (headers && headers.length > 0
        ? headers
        : (Object.keys(first) as (keyof T)[])) as (keyof T)[];
      const escape = (val: unknown) => {
        if (val === null || val === undefined) return '';
        const s = String(val).replace(/"/g, '""');
        if (/[",\n]/.test(s)) return `"${s}"`;
        return s;
      };
      const headerLine = (cols as string[]).map(h => escape(h)).join(',');
      const lines = rows.map(r =>
        (cols as (keyof T)[])
          .map(c => escape(r[c]))
          .join(','),
      );
      return [headerLine, ...lines].join('\n');
    },
    [],
  );

  const handleExport = useCallback(() => {
    // Choose the columns to export (ordered)
    const cols: (keyof BrandUser)[] = [
      'id',
      'englishName',
      'arabicName',
      'brandName',
      'brandCode',
      'username',
      'email',
      'createdAt',
      'status',
      'role',
      'id2',
    ];
    const csv = toCsv<BrandUser>(users, cols);
    const blob = new Blob([new TextEncoder().encode('\ufeff' + csv)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brands.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [toCsv, users]);

  const parseCsv = (text: string): Record<string, string>[] => {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return [];
    const headerLine = lines[0] ?? '';
    const headers = headerLine
      .split(',')
      .map(h => h.replace(/^\"|\"$/g, '').trim())
      .filter(h => h.length > 0);
    const rows: Record<string, string>[] = [];
    for (const raw of lines.slice(1)) {
      if (!raw) continue;
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let j = 0; j < raw.length; j++) {
        const ch = raw[j];
        if (ch === '"') {
          if (inQuotes && raw[j + 1] === '"') {
            current += '"';
            j++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      values.push(current);
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx]?.replace(/^\"|\"$/g, '').trim() ?? '';
      });
      rows.push(obj);
    }
    return rows;
  };

  const handleImportStart = async () => {
    if (!importFile) return;
    const isCsv = importFile.name.toLowerCase().endsWith('.csv');
    if (!isCsv) {
      alert('الرجاء رفع ملف CSV حالياً. دعم XLSX سيتم لاحقاً.');
      return;
    }
    const text = await importFile.text();
    const records = parseCsv(text);
    const mapStatus = (s: string): BrandUser['status'] => {
      const v = s?.toLowerCase();
      if (v === 'active' || v === 'نشط') return 'active';
      if (v === 'inactive' || v === 'غير نشط') return 'inactive';
      return 'pending';
    };
    for (const r of records) {
      const newUser: BrandUser = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        id2: r.id2 || r['id2'] || '',
        name: r.name || r['name'] || r.englishName || r['englishName'] || '',
        email: r.email || '',
        status: mapStatus(r.status || ''),
        role: r.role || 'user',
        createdAt: r.createdAt || new Date().toLocaleDateString('ar-EG'),
        brandName: r.brandName || '',
        brandCode: r.brandCode || '',
        arabicName: r.arabicName || '',
        englishName: r.englishName || '',
        username: r.username || '',
      };
      dispatch(addUser(newUser));
    }
    setIsImportOpen(false);
    setImportFile(null);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  justify-between w-full max-lg:flex-col gap-5 flex-wrap max-lg:p-1">
        <TitlePage title="العلامات التجارية" showBackArrow={false} />{' '}
        <div className="md:flex grid grid-cols-2 items-center gap-4  flex-wrap  max-md:justify-between max-lg:gap-4 ">
          
          <Button variant={'main_outline_cyan'} className=" rounded-3xl" onClick={() => setIsImportOpen(true)}>
            <Import
              size="32"
              color="#3AFFDE"
              variant="Bold"
              className="size-6 max-md:size-5"
            />
            استيراد البيانات
          </Button>
          <Button variant={'main_outline_yellow'} className=" rounded-3xl" onClick={handleExport}>
            <Export
              size="32"
              color="#E49F31"
              variant="Bold"
              className="size-6 max-md:size-5"
            />
            تصدير البيانات
          </Button>
          <Button
            variant={'main'}
            className="max-md:w-full rounded-3xl col-span-2 !text-white"
            asChild
          >
            <Link href="/brand/add-brand">
              <Add size="32" color="#fff" className="!w-6 !h-6" />
              إضافة علامة تجارية
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
        {statcardDetails.map((card, index) => (
          <StatsCard
            key={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            color={card.color}
          />
        ))}
      </div>
      <BrandsTable />
      <PopupComponent
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        type="success"
        mode="action"
        customComp={
          <UploadComponent
            accept={'.csv'}
            onFilesChange={fs => {
              const f = fs?.[0]?.file;
              if (f instanceof File) setImportFile(f);
            }}
          />
        }
        title="استيراد بيانات العلامات التجارية"
        subtitle="قم برفع ملف العلامات التجارية لاستيراد بياناتها إلى النظام. تأكد أن صيغة الملف متوافقة مع النموذج المعتمد."
        primaryButton={{
          comp: 'الرجوع',
          variant: 'main_outline',
          onClick: () => setIsImportOpen(false),
        }}
        secondaryButton={{
          comp: 'بدء الاستيراد',
          variant: 'main',
          onClick: handleImportStart,
        }}
      />
    </div>
  );
};

export default BrandsManagement;

