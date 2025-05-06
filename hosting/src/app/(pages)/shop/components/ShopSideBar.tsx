'use client';
import React from 'react';
import { H3, Title } from '@/components/atoms/Typography';
import { ICategory } from '@/shared/models/Category';
import Link from 'next/link';
import { Skeleton } from '@/components/atoms/skeleton';

export interface ShopSideBarProps {
  isLoading: boolean;
  categoryOptions: ICategory[];
}

const ShopSideBar = ({ isLoading, categoryOptions }: ShopSideBarProps) => {
  if (isLoading) {
    return (
      <div className='sticky top-0 h-screen overflow-y-auto border-r shadow p-4 bg-white'>
        <H3 className='font-semibold text-lg mb-3 mt-4'>Categories</H3>
        <Skeleton className='h-8 w-1/2 mb-2' />
        <div className='space-y-4'>
          <div className='border-b pb-3 gap-2 flex flex-col'>
            <Skeleton className='h-6'></Skeleton>
            <Skeleton className='h-6'></Skeleton>
            <Skeleton className='h-6'></Skeleton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='sticky top-0 h-screen overflow-y-auto border-r shadow p-4 bg-white'>
      <H3 className='font-semibold text-lg mb-3 mt-4'>Categories</H3>
      <div className='space-y-4'>
        <div className='border-b pb-3'>
          <Title className='font-bold cursor-pointer hover:text-blue-500 '>
            <Link href={'/shop/'}>All</Link>
          </Title>
          <ul className='space-y-3 mt-2'>
            {categoryOptions.map((category) => (
              <li
                key={category.id}
                className='cursor-pointer hover:text-blue-500'
              >
                <Link href={'/shop/category/' + category.name}>
                  <Title className='font-bold'>{category.name}</Title>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ShopSideBar };
