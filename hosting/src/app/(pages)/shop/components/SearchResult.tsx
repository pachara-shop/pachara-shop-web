'use client';

import { IProduct } from '@/shared/models/Product';
import { Title } from '@/components/atoms/Typography';
import { ShopProductCard } from './ShopProductCard';

interface SearchResultProps {
  items: IProduct[];
  isLoading: boolean;
}
const SearchResult = ({ items, isLoading }: SearchResultProps) => {
  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }
  return (
    <div>
      <div className='my-3 px-4 mt-7'>
        <Title className='font-bold'>
          {items.length === 0 ? 'No result' : 'Search result'}
        </Title>
      </div>
      <div className='grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 '>
        {items.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export { SearchResult };
