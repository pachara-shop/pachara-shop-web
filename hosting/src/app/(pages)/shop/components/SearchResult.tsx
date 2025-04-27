'use client';

import { IProduct } from '@/shared/models/Product';
import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components/atoms/Typography';
import { formatCurrency } from '@/lib/utils';
import { Suspense } from 'react';
import { ShopSideBar } from './ShopSideBar';

interface SearchResultProps {
  items: IProduct[];
  isLoading: boolean;
}
const SearchResult = ({ items, isLoading }: SearchResultProps) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className='w-full mx-[0.5px] relative'>
        <div className='flex flex-col lg:flex-row gap-1.5'>
          <div className='hidden lg:block w-64 shrink-0'>
            <ShopSideBar />
          </div>
          <div className='flex-1 min-h-screen'>
            <div className='my-3 px-4'>
              <Title className='font-bold'>{items.length} items</Title>
            </div>
            <div className='grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3  gap-1.5 '>
              {items.map((product) => (
                <div
                  key={product.id}
                  className=' overflow-hidden  hover:shadow-md transition-shadow'
                >
                  <Link href={`/product/${product.id}`}>
                    <div className='aspect-square bg-gray-200 relative w-full'>
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={100}
                        width={100}
                        className='object-cover w-full h-full'
                      />
                    </div>
                    <div className='p-4 pt-2 pl-3 flex flex-col'>
                      <Title className='font-bold'>
                        {product.price
                          ? formatCurrency(product.price, 'THB', 'th-TH')
                          : 0}
                      </Title>
                      <Title>{product.name}</Title>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export { SearchResult };
