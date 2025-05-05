import * as React from 'react';
import { ProductPageClient } from './components/ProductPageClient';
import { BannerClient } from './components/BannerClient';

export async function generateMetadata({ searchParams }: any) {
  const params = await searchParams;
  const category = params?.c || 'all';
  const categoryName = category === 'all' ? '' : category + ' | ';

  return {
    title: `${categoryName}Pachara Shop`,
    description: `Shop for various ${category} products here. Good quality at reasonable prices.`,
  };
}

export default async function Page() {
  return (
    <>
      <BannerClient />
      <ProductPageClient />
    </>
  );
}
