import { Suspense } from 'react';
import { ShopSideBar } from './components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <div className='w-full px-[0.5px] relative'>
        <div className='flex flex-col lg:flex-row gap-1.5'>
          <div className='hidden lg:block w-80 shrink-0'>
            <ShopSideBar />
          </div>
          <div className='flex-1 min-h-screen'>{children}</div>
        </div>
      </div>
    </Suspense>
  );
}
