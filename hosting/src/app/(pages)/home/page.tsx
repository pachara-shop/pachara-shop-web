// filepath: /D:/Work/pachara-shop/pachara-shop-web/hosting/src/app/(pages)/home/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

const filters = ['All', 'Category 1', 'Category 2', 'Category 3'];
const sortingOptions = ['Name', 'Date', 'Category'];

const fetchItems = async (filter: string) => {
  const response = await fetch(`/api/items?filter=${filter}`);
  const data = await response.json();
  return data;
};

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState('Name');

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(selectedFilter);
      setItems(data);
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
            <ul>
              {items.map((item) => (
                <li key={item.id} className='mb-2'>
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
