'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/atoms/form';
import { Icon } from '@/components/atoms/Icon';
import { ImageDropzone } from '@/components/atoms/ImageDropZone';
import { Input } from '@/components/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { Title } from '@/components/atoms/Typography';
import { ImagePreviewModal } from '@/components/molecules/ImagePreviewModal';
import Editor from '@/components/molecules/rich-text/editor';
import { CustomButton } from '@/components/ui/CustomButton';
import { Switch } from '@/components/ui/switch';
import { useGetCategoryOptionsQuery } from '@/hooks/slices/categoryAPI';
import { createProductSchema } from '@/shared/form-schema/product';
import { ICreateProduct } from '@/shared/models/Product';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProductDetailProps {
  mode: 'create' | 'edit';
  initialData: ICreateProduct;
  galleryImages?: string[];
  onSubmit: (data: ICreateProduct) => void;
  onAddImage?: (files: File[]) => void;
  onRemoveImage?: (imageId: string) => void;
}
export const ProductDetail = ({
  mode,
  initialData,
  galleryImages,
  onSubmit,
  onAddImage,
  onRemoveImage,
}: ProductDetailProps) => {
  const form = useForm<ICreateProduct>({
    values: initialData,
    resolver: zodResolver(createProductSchema),
  });

  const route = useRouter();
  const { data: categoryOptions } = useGetCategoryOptionsQuery();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleImageClick = (file: string) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files
      ? Array.from(e.target.files).filter(
          (file) => !files.some((f) => f.name === file.name)
        )
      : [];
    if (files.length + newFiles.length > 10) {
      return;
    }
    if (onAddImage) {
      await onAddImage(newFiles);
    }
    setFiles((prev) => [...prev, ...newFiles]);
  };
  return (
    <div className='p-4 relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-4'>
            <div className='bg-white w-[500px] border border-gray-200 rounded-lg p-4'>
              <h1 className='text-xl font-semibold'>Product detail</h1>
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
                        value={field.value?.toString() || ''}
                        // {...field}
                        type='text'
                        className='w-full'
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isDiscounted'
                render={({ field }) => (
                  <FormItem className='my-4 '>
                    <Title className='font-medium'>Use discount</Title>
                    <br />
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                          form.trigger('discountPrice');
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='discountPrice'
                render={({ field }) => (
                  <FormItem className='my-4'>
                    <Title className='font-medium'>
                      <span className='text-destructive mr-1'>*</span>Discount
                    </Title>
                    <FormControl>
                      <Input
                        disabled={!form.watch('isDiscounted')}
                        placeholder='Enter price'
                        value={field.value?.toString() || ''}
                        // {...field}
                        type='text'
                        className='w-full'
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          form.trigger('discountPrice');
                        }}
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
                      <Link href='/dashboard/category'>category settings</Link>.
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
                name='bannerFile'
                render={({ field }) => (
                  <FormItem className='my-4 mr-4'>
                    <Title className='font-medium'>
                      <span className='text-destructive mr-1'>*</span>Banner
                    </Title>
                    <FormControl>
                      <ImageDropzone
                        {...field}
                        className='w-[380px]'
                        imageUrl={initialData?.banner}
                        customName={
                          initialData?.banner &&
                          (initialData?.banner as string).split('/').pop()
                        }
                        setValue={(e) => {
                          form.setValue('bannerFile', e);
                        }}
                        formTrigger={() => {
                          form.trigger('bannerFile');
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
                    route.push('/dashboard/product');
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton className='' variant='black' type='submit'>
                  Save
                </CustomButton>
              </div>
            </div>
            <div className='bg-white w-[500px] border border-gray-200 rounded-lg p-4'>
              <h1 className='text-xl font-semibold'>Gallery</h1>
              <Title className='text-gray-500'>
                Select images to upload and the maximum is 10 items.
              </Title>
              <br />
              <Title className='text-gray-500'>
                {galleryImages?.length || 0} of 10 items selected
              </Title>
              <div className='mt-4 grid grid-cols-3 gap-4'>
                {galleryImages?.map((file, index) => (
                  <div
                    key={index}
                    className='relative flex flex-col items-center justify-center  
                    p-0 border-1 object-cover hover:scale-110 transition-transform group
                    cursor-pointer border-dashed border rounded-sm'
                  >
                    <Icon
                      icon='icon-[lucide--trash-2]'
                      className='absolute top-1 right-1 h-4 w-4 cursor-pointer 
                      text-gray-500 hover:scale-110 transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                      onClick={() => {
                        if (onRemoveImage) {
                          onRemoveImage(file);
                        }
                      }}
                    />
                    <Image
                      src={file}
                      alt='preview'
                      className='max-h-40 object-contain'
                      width={160}
                      height={160}
                      onClick={() => {
                        handleImageClick(file);
                      }}
                      loading='lazy'
                      quality={50}
                    />
                  </div>
                ))}
                <input
                  type='file'
                  multiple
                  className='hidden'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={files.length >= 10 || mode === 'create'}
                />
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  className={`h-[144px] hover:scale-105 transition-transform  
                  relative flex flex-col items-center justify-center bg-white border-1 
                  border-dashed border rounded-sm text-gray-500 hover:text-gray-600 ${
                    files.length >= 10 ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <Icon icon='icon-[lucide--image]' />
                  <Title>Upload images</Title>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
      {selectedFile && (
        <ImagePreviewModal
          file={selectedFile}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
