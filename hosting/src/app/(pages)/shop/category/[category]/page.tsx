'use client';

import { useParams } from 'next/navigation';
import { SearchResult } from '../../components';
import { useSearchProductByCategoryMutation } from '@/hooks/slices/fe/productAPI';
import { useEffect, useState } from 'react';
import { IProduct } from '@/shared/models/Product';

export default function Page() {
  const { category } = useParams();
  const [getProduct, { isLoading }] = useSearchProductByCategoryMutation();
  const [items, setItems] = useState<IProduct[]>([]);
  useEffect(() => {
    const loadItems = async () => {
      const { data } = await getProduct(category as string);
      if (data) {
        setItems(data.data);
      }
    };
    loadItems();
  }, [category, getProduct]);

  return <SearchResult items={items} isLoading={isLoading} />;
}
