'use client';

import { useSearchProductsMutation } from '@/hooks/slices/productAPI';
import { IProduct } from '@/shared/models/Product';
import React, { useEffect } from 'react';

export default function Page() {
  const [products, setProduct] = React.useState<IProduct[]>([]);
  const [getProducts] = useSearchProductsMutation();
  useEffect(async () => {
    const response = await getProducts({ filter: 'all' })
      .unwrap()
      .then((res) => res.data);
    setProduct(response);
  }, []);

  return (
    <div>
      <h1>product</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
