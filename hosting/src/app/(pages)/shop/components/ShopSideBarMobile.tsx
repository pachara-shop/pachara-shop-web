import Link from 'next/link';
import { ShopSideBarProps } from './ShopSideBar';
import { Skeleton } from '@/components/atoms/skeleton';

const ShopSideBarMobile = ({
  categoryOptions,
  isLoading,
}: ShopSideBarProps) => {
  if (isLoading) {
    return (
      <div className='flex gap-2 px-2 min-w-max'>
        <Skeleton className='h-8 w-1/2 mb-2' />
        <Skeleton className='h-8 w-1/2 mb-2' />
        <Skeleton className='h-8 w-1/2 mb-2' />
        <Skeleton className='h-8 w-1/2 mb-2' />
      </div>
    );
  }
  return (
    <div className='flex gap-2 px-2 min-w-max'>
      <button className='whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors text-sm font-medium'>
        <Link href={'/shop/'}>All</Link>
      </button>
      {categoryOptions.map((cat) => (
        <button
          key={cat.id}
          className='whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors text-sm font-medium'
        >
          <Link href={'/shop/category/' + cat.name}>{cat.name}</Link>
        </button>
      ))}
    </div>
  );
};

export { ShopSideBarMobile };
