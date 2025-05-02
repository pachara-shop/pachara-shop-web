'use client';
import { Skeleton } from '@/components/atoms/skeleton';
import { ProductCart } from '@/components/molecules/ProductCard';
import { useSearchProductsTopPageMutation } from '@/hooks/slices/fe/productAPI';
import { IProduct } from '@/shared/models/Product';
import { useEffect, useState } from 'react';

export function ProductPageClient() {
  const [getProduct, { isLoading }] = useSearchProductsTopPageMutation();
  const [items, setItems] = useState<IProduct[]>([]);
  useEffect(() => {
    const loadItems = async () => {
      const { data } = await getProduct();
      if (data) {
        setItems(data.data);
      }
    };
    loadItems();
  }, [getProduct]);
  return (
    <div className='flex justify-center mt-8 mb-8'>
      <div className='w-full max-w-screen-xl'>
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
  );
}
