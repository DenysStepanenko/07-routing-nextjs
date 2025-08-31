'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}

