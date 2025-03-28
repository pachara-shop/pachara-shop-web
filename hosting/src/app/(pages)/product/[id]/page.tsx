'use client';

import { useGetProductByIdQuery } from '@/hooks/slices/productAPI';
import { useGetProductGalleryByIdQuery } from '@/hooks/slices/productGalleryAPI';
import { useParams } from 'next/navigation';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { data } = useGetProductByIdQuery(productId || '');
  const { data: galleryData } = useGetProductGalleryByIdQuery(productId || '');

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex gap-8 flex-col lg:flex-row'>
        {/* gallery */}
        <div className='border-b-2 lg:border-b-0 lg:w-[70%]'>
          <div className='relative'>
            <Carousel
              opts={{
                align: 'center',
                loop: true,
              }}
              className='relative w-full'
              setApi={setApi}
            >
              <CarouselContent>
                {galleryData?.data?.map((image, index) => (
                  <CarouselItem key={index} className='relative h-[700px]'>
                    <Image
                      src={image}
                      alt={`Product image ${index + 1}`}
                      fill
                      className='object-contain'
                      priority={index === 0}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='absolute left-4 top-1/2 z-10' />
              <CarouselNext className='absolute right-4 top-1/2 z-10' />
            </Carousel>

            <div className='bottom-0 left-0 right-0 bg-black backdrop-blur-sm p-4 hidden md:block'>
              <div className='flex gap-2 justify-center'>
                {galleryData?.data?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 relative cursor-pointer transition-all duration-200 hover:opacity-75 hover:scale-105
                      ${current === index ? 'opacity-75 scale-110' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className='object-cover '
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* detail */}
        <div className='md:space-y-6 lg:border-l lg:pl-8 h-svh lg:w-[30%]'>
          <div className='border-b pb-6 lg:mt-14'>
            <h1 className='text-3xl font-semibold mb-2'>{data?.data?.name}</h1>
            <p className='text-2xl font-bold text-gray-900'>
              ฿{data?.data?.price?.toLocaleString()}
            </p>
          </div>
          <div className='space-y-4 mt-4'>
            <h2 className='text-xl font-semibold'>รายละเอียดสินค้า</h2>
            <p className='text-gray-600 whitespace-pre-wrap'>
              {data?.data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
