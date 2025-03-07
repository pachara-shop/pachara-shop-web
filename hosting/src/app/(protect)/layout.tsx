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
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function MainContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();
  if (!currentUser) router.push('/admin/login');

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
      <AuthProvider>
        <MainContent>
          <Sidebar />
          <header>
            <div className=' flex items-center justify-end bg-white  h-[120px] px-4 absolute top-0  w-[calc(100%-20rem)]'>
              <div className='flex items-center'>
                <User size={24} />
                <span className='ml-2'>Admin</span>
                <ChevronDown size={24} className='ml-2' />
              </div>
            </div>
          </header>
          {children}
        </MainContent>
      </AuthProvider>
    </div>
  );
}
