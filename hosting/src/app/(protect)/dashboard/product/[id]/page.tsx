'use client';

import { ProductDetail } from '@/app/components/product/ProductDetail';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/hooks/slices/productAPI';
import {
  useDeleteProductGalleryByIdMutation,
  useGetProductGalleryByIdQuery,
  useUploadProductGalleryMutation,
} from '@/hooks/slices/productGalleryAPI';
import { toast } from '@/hooks/use-toast';
import { ICategory } from '@/shared/models/Category';
import { ICreateProduct } from '@/shared/models/Product';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const { data } = useGetProductByIdQuery(productId || '');
  const { data: galleryData, refetch } = useGetProductGalleryByIdQuery(
    productId || ''
  );
  const [onUpdate] = useUpdateProductMutation();
  const [onUpdateGallery] = useUploadProductGalleryMutation();
  const [onRemoveImage] = useDeleteProductGalleryByIdMutation();

  const [initialData, setInitialData] = useState<ICreateProduct>({
    id: '',
    name: '',
    price: 0,
    file: undefined,
    categoryId: '',
    description: '',
    image: '',
    banner: '',
  });

  useEffect(() => {
    if (data?.data) {
      setInitialData({
        id: data.data.id,
        name: data.data.name,
        price: Number(data.data.price),
        file: data.data.image,
        bannerFile: data.data.banner,
        categoryId: (data.data.category as ICategory).id,
        description: data.data.description,
        image: data.data.image,
        banner: data.data.banner,
      });
    }
  }, [data]);

  const onSubmit = async (data: ICreateProduct) => {
    const formData = new FormData();
    if (productId) formData.append('id', productId);
    if (data.file) formData.append('file', data.file);
    if (data.bannerFile) formData.append('bannerFile', data.bannerFile);
    if (data.name) formData.append('name', data.name);
    if (data.price !== undefined)
      formData.append('price', data.price.toString());
    if (data.description) formData.append('description', data.description);
    if (data.categoryId)
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
    if (productId) formData.append('id', productId);
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
      mode='edit'
    />
  );
}
