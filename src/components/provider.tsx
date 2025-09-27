'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { SidebarProvider } from '@/context/use-open-sidebar';
import { store } from '@/store';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <SidebarProvider>{children}</SidebarProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
