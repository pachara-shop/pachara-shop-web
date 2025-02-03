'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import { Title } from '@/components/atoms/Typography';
import { CustomButton } from '@/components/ui/CustomButton';
import { categorySchema } from '@/shared/form-schema/category';
import { ICategory } from '@/shared/models/Category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface categoryDetailProps {
  onSubmit: (data: ICategory) => void;
  initialValues: ICategory;
}
const CategoryDetail: React.FC<categoryDetailProps> = ({
  onSubmit,
  initialValues,
}) => {
  const route = useRouter();
  const form = useForm<ICategory>({
    values: { ...initialValues },
    resolver: zodResolver(categorySchema),
  });

  return (
    <div className='p-4 relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='bg-white w-96 border border-gray-200 rounded-lg p-4'>
            <h1 className='text-xl font-semibold'>Create Category</h1>
            <div className='mt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Title className='font-medium'>
                        <span className='text-red-500 mr-1'>*</span>Name
                      </Title>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          placeholder='Enter item title'
                          type='text'
                          className=' bg-white'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <div className='absolute top-0 right-0 flex space-x-2'>
            <CustomButton variant='outline' type='submit'>
              Save
            </CustomButton>
            <CustomButton
              className=''
              variant='black'
              onClick={() => {
                route.push('/manage/category');
              }}
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { CategoryDetail };
