'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/features/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {props.children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
