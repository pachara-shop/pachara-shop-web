import Link from 'next/link';
import Image from 'next/image';
import { Text } from '@/components/atoms/Typography';
import { formatCurrency } from '@/lib/utils';
import React from 'react';
import { IProduct } from '@/shared/models/Product';

const ShopProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div
      key={product.id}
      className=' overflow-hidden  hover:shadow-md transition-shadow relative'
    >
      {product.isDiscounted && (
        <span className='absolute top-2 left-2 z-10 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-sm'>
          Sale
        </span>
      )}
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
          <div className='flex items-center mt-2 gap-2'>
            <Text
              className={`mt-1 text-xs font-medium text-gray-700 ${
                product.isDiscounted ? 'line-through' : ''
              }`}
            >
              {product.price
                ? formatCurrency(product.price, 'USD', 'en-EN')
                : 0}
            </Text>
            {product.isDiscounted && (
              <Text className='mt-1 text-xs font-medium text-gray-500'>
                {product.discountPrice
                  ? formatCurrency(product.discountPrice, 'USD', 'en-EN')
                  : 0}
              </Text>
            )}
          </div>

          <Text>{product.name}</Text>
        </div>
      </Link>
    </div>
  );
};

export { ShopProductCard };
