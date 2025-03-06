'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useGetProductByIdQuery } from '@/hooks/slices/productAPI';
import { useGetProductGalleryByIdQuery } from '@/hooks/slices/productGalleryAPI';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { data } = useGetProductByIdQuery(productId);
  const { data: galleryData } = useGetProductGalleryByIdQuery(productId);

  return (
    <>
      {/* <div className='w-full h-[800px] flex justify-center items-center'>
        <div className='w-full h-full overflow-hidden'>
          <Image
            height={800}
            width={1920}
            src={data?.data?.banner}
            alt='Large Image'
            className='w-full h-full object-cover transform transition-transform duration-300 '
          />
        </div>
      </div> */}
      <div className='mt-14'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {galleryData?.data?.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  width={500}
                  height={500}
                  src={image}
                  alt={`Product image ${index + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
