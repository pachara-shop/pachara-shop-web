'use client';

import { User, ChevronDown } from 'lucide-react';
import { Sidebar } from '../components/layouts/admin/Sidebar';
import GlobalSuspense from '@/components/ui/GlobalSuspense';
import Loading from '@/components/atoms/Loading';
import { useEffect, useState } from 'react';
import {
  onLoadingChange,
  removeLoadingChangeListener,
} from '@/emitter/loadingEmitter';

function MainContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleLoadingChange = (loading: boolean) => {
      setIsLoading(loading);
    };
    onLoadingChange(handleLoadingChange);
    return () => {
      removeLoadingChangeListener(handleLoadingChange);
    };
  }, []);

  return (
    <main className='p-4 transition-margin duration-300 mt-[120px] ml-64'>
      {isLoading && <Loading />}
      <GlobalSuspense>
        <div className='mx-10 py-[15px] h-full'>{children}</div>
      </GlobalSuspense>
    </main>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-[calc(100vh-120px)] bg-gray-100'>
      <Sidebar />
      <header className='fixed top-0 z-50 w-full bg-white border-b shadow-sm h-[120px] ml-64'>
        <nav>
          <div className='px-3 py-3 lg:px-5 lg:pl-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'></div>
              <div className='flex items-center'>
                <button className='flex items-center p-2 rounded-lg hover:bg-gray-100'>
                  <User className='w-6 h-6' />
                  <span className='ml-2'>Admin</span>
                  <ChevronDown className='w-4 h-4 ml-1' />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MainContent>{children}</MainContent>
      {/* <main className={'p-4 transition-margin duration-300 mt-[120px] ml-64'}>
        {children}
      </main> */}
    </div>
  );
}
