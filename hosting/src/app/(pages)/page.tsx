'use client';

import React, { useState, useEffect } from 'react';
import { IProduct } from '@/shared/models/Product';
import { useGetCategoryOptionsQuery } from '@/hooks/slices/categoryAPI';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/atoms/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { ProductCart } from '@/components/molecules/ProductCard';
import { useSearchFrontendProductsMutation } from '@/hooks/slices/fe/productAPI';
import { Banner2 } from '../components/layouts/Banner2';

const sortingOptions = [
  { name: 'ชื่อ', value: 'name' },
  { name: 'ราคา', value: 'price' },
  { name: 'ประเภท', value: 'category' },
];

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [getProduct, { isLoading }] = useSearchFrontendProductsMutation();
  const [selectedFilter, setSelectedFilter] = useState<string>(
    searchParams.get('c') || 'all'
  );
  const [items, setItems] = useState<IProduct[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>(
    searchParams.get('s') || ''
  );
  const { data: categoryOptions, isLoading: isCategoryOptionsLoading } =
    useGetCategoryOptionsQuery();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('s', selectedSorting);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedSorting]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedFilter !== 'all') {
      params.set('c', selectedFilter);
    } else {
      params.delete('c');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedFilter]);

  useEffect(() => {
    if (isCategoryOptionsLoading) return;
    const loadItems = async () => {
      const categoryId = categoryOptions?.data?.find(
        (item) => item.name === selectedFilter
      )?.id;
      const { data } = await getProduct({
        c: categoryId || selectedFilter,
        s: selectedSorting,
      });
      setItems(data.data);
    };
    loadItems();
  }, [searchParams, isCategoryOptionsLoading]);

  return (
    <>
      <Banner2 />
      <div className='flex justify-center p-4'>
        <div className='w-full max-w-screen-xl'>
          <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
            <div className='flex space-x-4 overflow-x-auto md:w-1/2 w-full'>
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
                    className={`px-2 py-2 cursor-pointer text-sm hover:font-bold ${
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
            <div
              className='flex md:justify-end space-x-4 mt-4 w-full md:mt-0  md:ml-0 ml-4 md:w-1/2 focus:outline'
              id='sorting'
            >
              <span className='font-light'>{items.length} สินค้า </span>
              <Select
                onValueChange={setSelectedSorting}
                defaultValue={selectedSorting}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='เรียงลำดับ' />
                </SelectTrigger>
                <SelectContent>
                  {sortingOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <ProductCart key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
