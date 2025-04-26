import * as React from 'react';
import { SearchResultClient } from './components';

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
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_PATH + '/fe/category',
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    console.error('Failed to fetch categories:', response.statusText);
    return null;
  }
  const initialCategories = await response.json();

  return <SearchResultClient categoryOptions={initialCategories.data} />;
}
