import * as React from 'react';
import { SearchResultClient } from './components';

export async function generateMetadata({ searchParams }: any) {
  const params = await searchParams;
  const category = params?.c || 'all';
  const categoryName = category === 'all' ? '' : category + ' | ';

  return {
    title: `${categoryName}Pachara Boutique`,
    description: `Shop for various ${category} products here. Good quality at reasonable prices.`,
  };
}

export default async function Page() {
  return <SearchResultClient />;
}
