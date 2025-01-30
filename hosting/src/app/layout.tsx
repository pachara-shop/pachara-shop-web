import React from 'react';
import '@/app/styles/globals.css';
import { Anuphan, Noto_Sans_Thai } from 'next/font/google';
import StoreProvider from './StoreProvider';
import { Suspense } from 'react';

const anuphan = Anuphan({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const notoSansThai = Noto_Sans_Thai({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['thai'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${anuphan.className} ${notoSansThai.className}`}>
        <Suspense>
          <StoreProvider>{children}</StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
