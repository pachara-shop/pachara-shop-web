'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import Loading from '@/components/atoms/Loading';

import Editor from '@/components/molecules/rich-text/editor';
import { CustomButton } from '@/components/ui/CustomButton';
import {
  useGetSettingAboutQuery,
  useUpdateSettingAboutMutation,
} from '@/hooks/slices/be/settings/aboutAPI';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function AboutSection() {
  const { toast } = useToast();
  const { data, isLoading } = useGetSettingAboutQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [onUpdateAbout] = useUpdateSettingAboutMutation();
  const form = useForm({
    defaultValues: {
      data: '',
    },
  });
  useEffect(() => {
    if (data?.data !== undefined) {
      form.reset({ data: data.data });
    }
  }, [data, form]);
  const handleSubmit = async (formData: { data: string }) => {
    try {
      await onUpdateAbout(formData.data).unwrap();
      toast({
        title: 'Success',
        description: 'About section updated successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to update about section:', error);
      toast({
        title: 'Error',
        description: 'Failed to update about section',
        variant: 'destructive',
      });
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='flex flex-col gap-4 relative'>
      <h2 className='text-lg font-semibold'>About</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='absolute right-0 top-0 '>
            {/* <CustomButton
              type='button'
              variant='outline'
              onClick={() => {
                // route.push('/dashboard/product');
              }}
            >
              Cancel
            </CustomButton> */}
            <CustomButton variant='black' type='submit'>
              Save
            </CustomButton>
          </div>

          <FormField
            control={form.control}
            name='data'
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
        </form>
      </Form>
    </div>
  );
}
