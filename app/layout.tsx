'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import './globals.css';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <html lang="ru">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main>
            {children}
          </main>
          {modal}
        </QueryClientProvider>
      </body>
    </html>
  );
}

