'use client';

import { ProductDetail } from '@/app/components/product/ProductDetail';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/hooks/slices/productAPI';
import {
  useDeleteProductGalleryByIdMutation,
  useGetProductGalleryByIdQuery,
  useUpdateProductGalleryMutation,
} from '@/hooks/slices/productGalleryAPI';
import { toast } from '@/hooks/use-toast';
import { ICategory } from '@/shared/models/Category';
import { ICreateProduct } from '@/shared/models/Product';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { data } = useGetProductByIdQuery(productId);
  const { data: galleryData, refetch } =
    useGetProductGalleryByIdQuery(productId);
  const [onUpdate] = useUpdateProductMutation();
  const [onUpdateGallery] = useUpdateProductGalleryMutation();
  const [onRemoveImage] = useDeleteProductGalleryByIdMutation();

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
        toast({
          toastType: 'success',
          description: 'Update Announcement successful.',
        });
      });
  };

  const onAddImage = async (files: File[]) => {
    const formData = new FormData();
    formData.append('id', productId);
    files.forEach((file) => {
      formData.append('files', file);
    });

    await onUpdateGallery({ id: id as string, formData })
      .unwrap()
      .then(() => {
        toast({
          toastType: 'success',
          description: 'Update Gallery successful.',
        });
      });
    refetch();
  };

  const onRemoveGalleryItem = async (imageId: string) => {
    await onRemoveImage({ id: id as string, image: imageId })
      .unwrap()
      .then(() => {
        toast({
          toastType: 'success',
          description: 'Remove Image successful.',
        });
      });
    refetch();
  };

  return (
    <ProductDetail
      initialData={initialData}
      onSubmit={onSubmit}
      onAddImage={onAddImage}
      galleryImages={galleryData?.data}
      onRemoveImage={onRemoveGalleryItem}
    />
  );
}
