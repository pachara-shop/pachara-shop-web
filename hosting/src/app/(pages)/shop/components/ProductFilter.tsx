'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ProductFilter = () => {
  const filterOptions = [
    { name: 'All', value: 'all' },
    { name: 'Category', value: 'category' },
    { name: 'Price', value: 'price' },
    { name: 'Search', value: 'Search' },
    { name: 'Menu1', value: 'menu1' },
    { name: 'Menu2', value: 'menu2' },
  ];
  const searchParams = useSearchParams();

  const [selectedFilter, setSelectedFilter] = useState<string>(
    searchParams?.get('c') || 'all'
  );
  return (
    <div className='border-b border-t-4 pt-2'>
      <div className='w-full'>
        <div className='flex space-x-4 overflow-x-auto md:w-1/2 w-full whitespace-nowrap pb-2 px-2'>
          <ul className='flex gap-2'>
            {filterOptions?.map((item) => (
              <li
                key={item.value}
                className={`bg-[#CCFF00] text-[#00000] p-1.5 min-w-14 text-center cursor-pointer rounded-full text-[14px] font-bold ${
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
      </div>
    </div>
  );
};

export { ProductFilter };
