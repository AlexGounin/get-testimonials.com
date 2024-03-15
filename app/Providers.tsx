'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@/features/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {props.children}
    </ThemeProvider>
  );
};
