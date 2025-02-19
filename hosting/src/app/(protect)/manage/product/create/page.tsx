'use client';

import { ProductDetail } from '@/app/components/product/ProductDetail';
import { useCreateProductMutation } from '@/hooks/slices/productAPI';
import { ICreateProduct } from '@/shared/models/Product';
import { useRouter } from 'next/navigation';

export default function Page() {
  const route = useRouter();
  const [onCreate] = useCreateProductMutation();
  const initialData: ICreateProduct = {
    image: null,
    id: '',
    name: '',
    price: undefined,
  };
  const onSubmit = async (data: ICreateProduct) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('category', data.categoryId.toString());

    await onCreate(formData)
      .unwrap()
      .then(() => {
        route.push('/manage/product');
      });
  };

  return <ProductDetail initialData={initialData} onSubmit={onSubmit} />;
}
