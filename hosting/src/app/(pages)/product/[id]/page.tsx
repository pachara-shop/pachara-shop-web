import { ProductItemDetail } from '@/app/(pages)/product/components/ProductItemDetail';
import { notFound } from 'next/navigation';

async function fetchProductData(productId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_PATH}/fe/product/${productId}`;
  const productResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const productData = await productResponse.json();
  if (!productResponse.ok) {
    return notFound();
  }
  return productData;
}

async function fetchGalleryData(productId: string) {
  const galleryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/fe/product/${productId}/gallery`
  );
  const galleryData = await galleryResponse.json();
  return galleryData;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const productId = Array.isArray(id) ? id[0] : id;
  const productData = await fetchProductData(productId);
  const galleryData = await fetchGalleryData(productId);

  return (
    <ProductItemDetail
      data={productData?.data}
      galleryData={galleryData?.data}
    />
  );
}
