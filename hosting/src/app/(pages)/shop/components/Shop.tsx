'use client';

import { useSearchFrontendProductsMutation } from '@/hooks/slices/fe/productAPI';
import { IProduct } from '@/shared/models/Product';
import { useEffect, useState } from 'react';
import { SearchResult } from './SearchResult';
const Shop = () => {
  const [getProduct, { isLoading }] = useSearchFrontendProductsMutation();
  const [items, setItems] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const { data } = await getProduct({
        c: 'all',
      });
      if (data) {
        setItems(data.data);
      }
    };
    loadItems();
  }, []);

  return <SearchResult items={items} isLoading={isLoading} />;
};

export { Shop };
