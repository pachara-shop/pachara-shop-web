'use client';

import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const route = useRouter();
  return (
    <div className='p-4 relative'>
      <div className='bg-white w-96 border border-gray-200 rounded-lg p-4'>
        <h1 className='text-xl font-semibold'>Create Product</h1>
        <div className='mt-4'>
          <label htmlFor='name' className='block text-sm font-medium'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full border border-gray-200 rounded-lg p-2 mt-1'
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='price' className='block text-sm font-medium'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            className='w-full border border-gray-200 rounded-lg p-2 mt-1'
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='category' className='block text-sm font-medium'>
            Category
          </label>
          <input
            type='text'
            id='category'
            name='category'
            className='w-full border border-gray-200 rounded-lg p-2 mt-1'
          />
        </div>
        <div className='mt-4'>
          <label htmlFor='stock' className='block text-sm font-medium'>
            Stock
          </label>
          <input
            type='number'
            id='stock'
            name='stock'
            className='w-full border border-gray-200 rounded-lg p-2 mt-1'
          />
        </div>
      </div>
      <div className='absolute top-0 right-0 flex space-x-2'>
        <Button
          className=''
          variant='outline'
          onClick={() => {
            route.push('/manage/product');
          }}
        >
          Save
        </Button>
        <Button
          className=''
          variant='black'
          onClick={() => {
            route.push('/manage/product');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
