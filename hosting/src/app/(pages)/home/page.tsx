'use client';

import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { IProduct } from '@/shared/models/Product';
import Image from 'next/image';
import { useGetFrontendProductsMutation } from '@/hooks/slices/productAPI';

const filters = ['All', 'Tote Bags', 'Belt Bags', 'Backpack'];
const sortingOptions = ['Name', 'Date', 'Category'];

export default function Page() {
  const [getProduct, { isLoading }] = useGetFrontendProductsMutation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [items, setItems] = useState<IProduct[]>([]);
  const [selectedSorting, setSelectedSorting] = useState('Name');

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    const loadItems = async () => {
      const { data } = await getProduct();
      setItems(data.data);
    };
    loadItems();
  }, [selectedFilter]);

  return (
    <div className='flex justify-center p-4'>
      <div className='w-full max-w-screen-xl'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex space-x-4'>
            <ul className='flex '>
              {filters.map((filter) => (
                <li
                  key={filter}
                  className={`px-2 py-2 cursor-pointer text-sm ${
                    selectedFilter === filter
                      ? ' text-black font-bold underline'
                      : ' text-gray-700'
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center space-x-4'>
            <span>{items.length} items found</span>
            <Popover>
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
            </Popover>
          </div>
        </div>
        <div>
          {items.length > 0 ? (
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
          ) : (
            <p className='text-center text-gray-500'>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
