'use client';
import { Icon } from '@/components/atoms/Icon';
import { Title } from '@/components/atoms/Typography';
import { ImagePreviewModal } from '@/components/molecules/ImagePreviewModal';
import {
  useAddSettingBannersMutation,
  useDeleteSettingBannersMutation,
  useGetSettingBannersQuery,
} from '@/hooks/slices/be/settings/bannerAPI';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { SettingBanner } from '@/shared/models/Settings';
import Loading from '@/components/atoms/Loading';

export function GallerySection() {
  const { data, isLoading } = useGetSettingBannersQuery();
  const [onUpdateGallery] = useAddSettingBannersMutation();
  const [onRemoveImage] = useDeleteSettingBannersMutation();
  const [banners, setBanners] = useState<SettingBanner[]>([]);

  useEffect(() => {
    if (data?.data) {
      setBanners(data.data);
    }
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const handleImageClick = (file: string) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const onAddImage = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    await onUpdateGallery(formData)
      .unwrap()
      .then((response) => {
        if (response.data) {
          toast({
            toastType: 'success',
            description: 'Upload image successful.',
          });
          setBanners((prev) => [
            ...prev,
            ...response.data.map((file) => ({
              id: file.id,
              url: file.url,
            })),
          ]);
        }
      });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles) {
      await onAddImage(Array.from(newFiles));
    }
  };

  const handleRemoveImage = async (banner: SettingBanner) => {
    await onRemoveImage(banner.id)
      .unwrap()
      .then(() => {
        toast({
          toastType: 'success',
          description: 'Remove image successful.',
        });
        setBanners((prev) => prev.filter((file) => file.id !== banner.id));
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-white w-full border border-gray-200 rounded-lg p-4'>
        <Title className='text-gray-500'>
          Select images to upload and the maximum is 10 items.
        </Title>
        <br />
        <Title className='text-gray-500'>
          {banners.length || 0} of 10 items selected
        </Title>
        <div className='mt-4 grid grid-cols-3 gap-4'>
          {banners.map((file, index) => (
            <div
              key={index}
              className='relative flex flex-col items-center justify-center p-0 border-1 object-cover hover:scale-105 transition-transform group cursor-pointer border-dashed border rounded-sm'
            >
              <Icon
                icon='icon-[lucide--trash-2]'
                className='absolute top-1 right-1 h-4 w-4 cursor-pointer text-gray-500 hover:scale-110 transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                onClick={() => {
                  handleRemoveImage(file);
                }}
              />
              <Image
                src={file.url}
                alt='preview'
                className='max-h-40 object-contain'
                width={160}
                height={160}
                onClick={() => {
                  handleImageClick(file.url);
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
                          banners.length >= 10
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
          >
            <Icon icon='icon-[lucide--image]' />
            <Title>Upload images</Title>
          </div>
        </div>
      </div>

      {selectedFile && (
        <ImagePreviewModal
          file={selectedFile}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
