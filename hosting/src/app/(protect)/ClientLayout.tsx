'use client';

import { Sidebar } from '../components/layouts/admin/Sidebar';
import GlobalSuspense from '@/components/ui/GlobalSuspense';
import Loading from '@/components/atoms/Loading';
import { useEffect, useState } from 'react';
import {
  onLoadingChange,
  removeLoadingChangeListener,
} from '@/emitter/loadingEmitter';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Header } from '../components/layouts/admin/Header';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/atoms/toaster';

function MainContent({
  isCollapsed,
  children,
}: {
  isCollapsed: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    <main
      className={`p-4 transition-margin duration-300 mt-[120px] ${
        isCollapsed ? 'ml-0' : 'ml-64'
      }`}
    >
      {isLoading && <Loading />}
      <GlobalSuspense>
        <div className='mx-10 py-[15px] h-full'>{children}</div>
      </GlobalSuspense>
    </main>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className='min-h-[calc(100vh-120px)] bg-gray-100 relative'>
      <AuthProvider>
        <Header isCollapsed={isCollapsed} />
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <MainContent isCollapsed={isCollapsed}>
          {children}
          <Toaster />
        </MainContent>
      </AuthProvider>
    </div>
  );
}
