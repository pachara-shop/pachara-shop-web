'use client';

import { IProduct } from '@/shared/models/Product';
import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components/atoms/Typography';
import { formatCurrency } from '@/lib/utils';

interface SearchResultProps {
  items: IProduct[];
  isLoading: boolean;
}
const SearchResult = ({ items, isLoading }: SearchResultProps) => {
  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }
  return (
    <div>
      <div className='my-3 px-4 mt-7'>
        <Title className='font-bold'>Search result</Title>
      </div>
      <div className='grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 '>
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
  );
};

export { SearchResult };
