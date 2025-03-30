'use client';

import { ProductDetail } from '@/app/(protect)/components/product/ProductDetail';
import { useCreateProductMutation } from '@/hooks/slices/productAPI';
import { ICreateProduct } from '@/shared/models/Product';
import { useRouter } from 'next/navigation';

export default function Page() {
  const route = useRouter();
  const [onCreate] = useCreateProductMutation();
  const initialData: ICreateProduct = {
    image: undefined,
    id: '',
    name: '',
    price: undefined,
  };
  const onSubmit = async (data: ICreateProduct) => {
    const formData = new FormData();
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.bannerFile) {
      formData.append('bannerFile', data.bannerFile);
    }
    formData.append('name', data.name);
    if (data.price !== undefined) {
      formData.append('price', data.price.toString());
    }
    if (data.description !== undefined) {
      formData.append('description', data.description);
    }
    if (data.categoryId !== undefined) {
      formData.append('category', data.categoryId.toString());
    }

    await onCreate(formData)
      .unwrap()
      .then(() => {
        route.push('/dashboard/product');
      });
  };

  return (
    <ProductDetail
      initialData={initialData}
      onSubmit={onSubmit}
      mode='create'
    />
  );
}
