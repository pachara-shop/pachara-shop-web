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

function stripHtml(html: string = ''): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateMetadata(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  const productId = Array.isArray(id) ? id[0] : id;
  const productData = await fetchProductData(productId);
  const product = productData?.data;
  return {
    title: product?.name || 'Product',
    description: product?.description || '',
    openGraph: {
      title: product?.name || 'Product',
      description: stripHtml(product?.description) || '',
      images: [
        {
          url: product?.image || '/logo.svg',
          width: 1200,
          height: 630,
          alt: product?.name || 'pachara boutique',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product?.name || 'Product',
      description: stripHtml(product?.description) || '',
      images: [product?.image || '/logo.svg'],
    },
  };
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
    <div>
      <ProductItemDetail
        data={productData?.data}
        galleryData={
          galleryData?.data.length > 0
            ? galleryData?.data
            : [productData?.data.image]
        }
      />
    </div>
  );
}
