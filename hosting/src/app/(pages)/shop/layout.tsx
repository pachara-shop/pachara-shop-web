'use client';

import { Suspense, useEffect, useState } from 'react';
import { ShopSideBar } from './components';
import { useGetCategoryFEQuery } from '@/hooks/slices/fe/categoryAPI';
import { ICategory } from '@/shared/models/Category';
import { ShopSideBarMobile } from './components/ShopSideBarMobile';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetCategoryFEQuery();
  const [categoryOptions, setCategoryOptions] = useState<ICategory[]>([]);
  useEffect(() => {
    if (data?.data) {
      setCategoryOptions(data.data);
    }
  }, [data]);

  return (
    <Suspense fallback={null}>
      <div className='w-full px-[0.5px] relative'>
        <div className='flex flex-col lg:flex-row gap-1.5'>
          <div className='hidden lg:block w-80 shrink-0'>
            <ShopSideBar
              categoryOptions={categoryOptions}
              isLoading={isLoading}
            />
          </div>
          <div className='lg:hidden w-full overflow-x-auto py-2 bg-white border-b'>
            <ShopSideBarMobile
              isLoading={isLoading}
              categoryOptions={categoryOptions}
            />
          </div>
          <div className='flex-1 min-h-screen'>{children}</div>
        </div>
      </div>
    </Suspense>
  );
}
