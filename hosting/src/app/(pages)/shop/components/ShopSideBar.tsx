'use client';
import React from 'react';

// import { Icon } from '@/components/atoms/Icon';
// import { Input } from '@/components/atoms/input';
import { H3, Title } from '@/components/atoms/Typography';
import { useGetCategoryFEQuery } from '@/hooks/slices/fe/categoryAPI';
import { ICategory } from '@/shared/models/Category';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { Checkbox } from '@/components/ui/checkbox';

// const prices = [
//   { min: 0, max: 1000 },
//   { min: 1001, max: 5000 },
//   { min: 5001, max: 10000 },
// ];
const ShopSideBar = () => {
  const { data } = useGetCategoryFEQuery();
  // const [searchTerm, setSearchTerm] = useState('');
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [categoryOptions, setCategoryOptions] = useState<ICategory[]>([]);
  useEffect(() => {
    if (data?.data) {
      setCategoryOptions(data.data);
    }
  }, [data]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [searchTerm]);

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const params = new URLSearchParams(url.search);

  //   if (debouncedSearchTerm) {
  //     params.set('k', debouncedSearchTerm);
  //   } else {
  //     params.delete('k');
  //   }

  //   url.search = params.toString();
  //   window.history.pushState({}, '', url.toString());
  // }, [debouncedSearchTerm]);

  // const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  return (
    <div className='sticky top-0 h-screen overflow-y-auto border-r shadow p-4 bg-white'>
      {/* <div className='border-b relative'>
        <Icon
          icon='icon-[material-symbols--search]'
          className='absolute top-2 right-3 text-muted-foreground text-base'
        />
        <Input
          placeholder='Search...'
          className='w-full mb-3 rounded-full'
          type='text'
          value={searchTerm}
          onChange={onKeywordChange}
        />
      </div> */}
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
        {/* <div className='border-b pb-3'>
          <H3 className='font-medium mb-2'>Price</H3>
          <div className='space-y-1'>
            {prices.map((price) => (
              <div key={price.min} className='flex items-center'>
                <Checkbox id={`price-${price.min}`} className='mr-2' />
                <label htmlFor={`price-${price.min}`}>
                  {price.min} - {price.max}
                </label>
              </div>
            ))}
          </div>
        </div> */}
        {/* เพิ่มตัวกรองอื่นๆ */}
        {/* <div>
          <h4 className='font-medium mb-2'>Other</h4>
          <ul className='space-y-1'>
            <li>
              <Title>Sale</Title>
            </li>
            <li>
              <Title>New</Title>
            </li>
            <li>
              <Title>Incoming</Title>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export { ShopSideBar };
