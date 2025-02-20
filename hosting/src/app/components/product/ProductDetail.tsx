'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { ImageDropzone } from '@/components/atoms/ImageDropZone';
import { Input } from '@/components/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Textarea } from '@/components/atoms/textarea';
import { Title } from '@/components/atoms/Typography';
import { CustomButton } from '@/components/ui/CustomButton';
import { useGetCategoryOptionsQuery } from '@/hooks/slices/categoryAPI';
import { createProductSchema } from '@/shared/form-schema/product';
import { ICreateProduct } from '@/shared/models/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductDetailProps {
  initialData: ICreateProduct;
  onSubmit: (data: ICreateProduct) => void;
}
export const ProductDetail = ({
  initialData,
  onSubmit,
}: ProductDetailProps) => {
  const form = useForm<ICreateProduct>({
    values: initialData,
    resolver: zodResolver(createProductSchema),
  });

  const route = useRouter();
  const { data: categoryOptions } = useGetCategoryOptionsQuery();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (categoryOptions?.data) {
      setOptions(
        categoryOptions.data.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  }, [categoryOptions]);

  return (
    <div className='p-4 relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='bg-white w-[500px] border border-gray-200 rounded-lg p-4'>
            <h1 className='text-xl font-semibold'>Create Product</h1>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='my-4'>
                  <span className='text-destructive mr-1'>*</span>
                  <Title className='font-medium'>Name</Title>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder={`Enter name`}
                      type='text'
                      className='bg-white'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='my-4'>
                  <Title className='font-medium'>
                    <span className='text-destructive mr-1'>*</span>Price
                  </Title>
                  <FormControl>
                    <Input
                      placeholder='Enter price'
                      {...field}
                      type='text'
                      className='w-full'
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <Title>Category</Title>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormDescription>
                    You can manage category in{' '}
                    <Link href='/manage/category'>category settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='file'
              render={({ field }) => (
                <FormItem className='my-4 mr-4'>
                  <Title className='font-medium'>
                    <span className='text-destructive mr-1'>*</span>Image
                  </Title>
                  <FormControl>
                    <ImageDropzone
                      {...field}
                      className='w-[380px]'
                      imageUrl={initialData?.image}
                      customName={
                        initialData?.image &&
                        (initialData?.image as string).split('/').pop()
                      }
                      setValue={(e) => {
                        form.setValue('file', e);
                      }}
                      formTrigger={() => {
                        form.trigger('file');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='my-4 mr-4'>
                  <Title className='font-medium'>Description</Title>
                  <FormControl>
                    <Textarea
                      placeholder='Description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=' flex space-x-2 pt-4 justify-end'>
              <CustomButton
                type='button'
                variant='outline'
                onClick={() => {
                  route.push('/manage/product');
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton className='' variant='black' type='submit'>
                Save
              </CustomButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
