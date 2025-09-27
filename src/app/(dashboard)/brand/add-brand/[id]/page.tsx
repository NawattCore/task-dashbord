import React from 'react';

import EditBrandPage from '@/components/sections/brands-management/edit-brand/edit-brand-page';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <EditBrandPage id={id} />
    </div>
  );
}
