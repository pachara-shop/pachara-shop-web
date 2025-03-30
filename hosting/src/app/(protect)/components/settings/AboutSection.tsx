'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';

import Editor from '@/components/molecules/rich-text/editor';
import { CustomButton } from '@/components/ui/CustomButton';
import { Title } from '@radix-ui/react-toast';
import { useForm } from 'react-hook-form';

export function AboutSection() {
  const form = useForm({});
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold'>About</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='my-4 '>
                <FormControl>
                  <Editor
                    content={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder='Write your post here...'
                    exportName='Maintenance'
                    className='min-h-80'
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
                // route.push('/dashboard/product');
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton className='' variant='black' type='submit'>
              Save
            </CustomButton>
          </div>
        </form>
      </Form>
      <p className='text-sm text-gray-500'>
        This is a simple hosting service for your static website. You can deploy
        your website using the GitHub integration or upload your files directly.
      </p>
    </div>
  );
}
