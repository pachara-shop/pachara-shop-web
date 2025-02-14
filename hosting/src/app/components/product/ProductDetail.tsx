'use client';

import { ImageDropzone } from '@/components/atoms/ImageDropZone';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { CustomButton } from '@/components/ui/CustomButton';
import { useGetCategoryOptionsQuery } from '@/hooks/slices/CategoryAPI';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ProductDetail = () => {
  const initialData = {
    image: null,
  };
  const route = useRouter();
  const { data } = useGetCategoryOptionsQuery();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (data?.data) {
      setOptions(
        data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  }, [data]);

  return (
    <div className='p-4 relative'>
      <div className='bg-white w-[500px] border border-gray-200 rounded-lg p-4'>
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
          <Select
            onValueChange={(_value) => {
              // tableInstance?.resetPageIndex();
              // tableInstance
              //   ?.getColumn('status')
              //   ?.setFilterValue(value !== 'all' ? value : undefined);
            }}
            // defaultValue={String(
            //   columnFilters.filter((t) => t.id === 'status')[0]?.value ??
            //     'displaying'
            // )}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className='capitalize'
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='mt-4'>
          <label htmlFor='stock' className='block text-sm font-medium'>
            image
          </label>
          <ImageDropzone
            className='w-[380px]'
            imageUrl={initialData?.image}
            customName={
              initialData?.image &&
              (initialData?.image as string).split('/').pop()
            }
            setValue={(_e) => {
              // form.setValue('image_pc_file', e);
            }}
            formTrigger={() => {
              // form.trigger('image_pc_file');
            }}
          />
        </div>
        <div className='absolute top-0 right-0 flex space-x-2'>
          <CustomButton
            className=''
            variant='outline'
            onClick={() => {
              route.push('/manage/product');
            }}
          >
            Save
          </CustomButton>
          <CustomButton
            className=''
            variant='black'
            onClick={() => {
              route.push('/manage/product');
            }}
          >
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
