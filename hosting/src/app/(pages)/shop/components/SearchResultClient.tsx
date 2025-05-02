'use client';

import { Title } from '@radix-ui/react-toast';
import { useSearchFrontendProductsMutation } from '@/hooks/slices/fe/productAPI';
import { useEffect, useState } from 'react';
import { IProduct } from '@/shared/models/Product';
import { useSearchParams } from 'next/navigation';
import { ShopProductCard } from './ShopProductCard';
export function SearchResultClient() {
  const searchParams = useSearchParams();
  const [getProduct, { isLoading }] = useSearchFrontendProductsMutation();
  const [items, setItems] = useState<IProduct[]>([]);
  const keyword = searchParams.get('k') || undefined;
  useEffect(() => {
    const loadItems = async () => {
      const { data } = await getProduct({
        c: 'all',
        k: keyword,
      });
      if (data) {
        setItems(data.data);
      }
    };
    loadItems();
  }, [keyword]);

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
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
