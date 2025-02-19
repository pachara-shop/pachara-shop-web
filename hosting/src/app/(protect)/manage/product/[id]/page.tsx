'use client';

import { ProductDetail } from '@/app/components/product/ProductDetail';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/hooks/slices/productAPI';
import { ICategory } from '@/shared/models/Category';
import { ICreateProduct } from '@/shared/models/Product';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const route = useRouter();
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { data } = useGetProductByIdQuery(productId);
  const [onUpdate] = useUpdateProductMutation();

  const [initialData, setInitialData] = useState<ICreateProduct>({
    id: '',
    name: '',
    price: 0,
    file: null,
    categoryId: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (data?.data) {
      setInitialData({
        id: data.data.id,
        name: data.data.name,
        price: Number(data.data.price),
        file: data.data.image,
        categoryId: (data.data.category as ICategory).id,
        description: data.data.description,
        image: data.data.image,
      });
    }
  }, [data]);

  const onSubmit = async (data: ICreateProduct) => {
    const formData = new FormData();
    formData.append('id', productId);
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('category', data.categoryId.toString());

    await onUpdate(formData)
      .unwrap()
      .then(() => {
        route.push('/manage/product');
      });
  };

  return <ProductDetail initialData={initialData} onSubmit={onSubmit} />;
}
