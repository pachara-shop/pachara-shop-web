import { ProductItemDetail } from '@/app/components/fe/product/ProductItemDetail';

async function fetchProductData(productId: string) {
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/product/${productId}`
  );
  const productData = await productResponse.json();
  return productData;
}

async function fetchGalleryData(productId: string) {
  const galleryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/product/${productId}/gallery`
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
