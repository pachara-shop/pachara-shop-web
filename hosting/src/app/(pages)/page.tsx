'use client';

import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { IProduct } from '@/shared/models/Product';
import Image from 'next/image';
import { useSearchFrontendProductsMutation } from '@/hooks/slices/productAPI';
import { useGetCategoryOptionsQuery } from '@/hooks/slices/CategoryAPI';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/atoms/skeleton';

const sortingOptions = ['Name', 'Date', 'Category'];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [getProduct, { isLoading }] = useSearchFrontendProductsMutation();
  const [selectedFilter, setSelectedFilter] = useState<string>(
    searchParams.get('c') || 'all'
  );
  const [items, setItems] = useState<IProduct[]>([]);
  const [selectedSorting, setSelectedSorting] = useState('Name');
  const { data: categoryOptions, isLoading: isCategoryOptionsLoading } =
    useGetCategoryOptionsQuery();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedFilter !== 'all') {
      params.set('c', selectedFilter);
    } else {
      params.delete('c');
    }
    router.push(`?${params.toString()}`);
  }, [selectedFilter]);

  useEffect(() => {
    if (isCategoryOptionsLoading) return;
    const params = new URLSearchParams(searchParams);
    if (selectedFilter !== 'all') {
      params.set('c', selectedFilter);
    } else {
      params.delete('c');
    }
    router.push(`?${params.toString()}`);

    const loadItems = async () => {
      const categoryId = categoryOptions?.data?.find(
        (item) => item.name === selectedFilter
      )?.id;
      const { data } = await getProduct({ c: categoryId || selectedFilter });
      setItems(data.data);
    };
    loadItems();
  }, [searchParams, isCategoryOptionsLoading]);

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-screen-xl'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex space-x-4'>
            <ul className='flex'>
              <li
                key={'select-all'}
                className={`px-2 py-2 cursor-pointer text-sm ${
                  selectedFilter === 'all'
                    ? ' text-black font-bold underline'
                    : ' text-gray-700'
                }`}
                onClick={() => setSelectedFilter('all')}
              >
                ทั้งหมด
              </li>
              {categoryOptions?.data?.map((item) => (
                <li
                  key={item.id}
                  className={`px-2 py-2 cursor-pointer text-sm ${
                    selectedFilter === item.name
                      ? ' text-black font-bold underline'
                      : ' text-gray-700'
                  }`}
                  onClick={() => setSelectedFilter(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center space-x-4'>
            <span>{items.length} items found</span>
            {/* <Popover>
              <PopoverTrigger className='px-4 py-2 bg-gray-200 rounded'>
                Sort by: {selectedSorting}
              </PopoverTrigger>
              <PopoverContent className='bg-white p-4 rounded shadow-lg'>
                {sortingOptions.map((option) => (
                  <button
                    key={option}
                    className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                    onClick={() => setSelectedSorting(option)}
                  >
                    {option}
                  </button>
                ))}
              </PopoverContent>
            </Popover> */}
          </div>
        </div>
        {isLoading && (
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className='flex flex-col transition-all duration-300 ease-in-out'
                >
                  <Skeleton className='h-[320px] w-full bg-gray-100 p-1' />
                  <Skeleton className='h-5 w-full bg-gray-100 mt-2' />
                  <Skeleton className='h-5 w-full bg-gray-100 mt-2' />
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          {!isLoading && items.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`
                    flex flex-col 
                    transition-all duration-300 ease-in-out
                    ${
                      isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }
                  `}
                >
                  <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group'>
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                      className='object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                  </div>
                  <h3 className='mt-4 text-sm font-medium text-gray-900'>
                    {item.name}
                  </h3>
                  <p className='mt-1 text-sm font-medium text-gray-700'>
                    ฿{item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
