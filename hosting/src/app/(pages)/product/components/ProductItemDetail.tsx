'use client';

import Viewer from '@/components/molecules/rich-text/viewer';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { formatCurrency } from '@/lib/utils';
import { IProduct } from '@/shared/models/Product';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ProductItemDetailProps = {
  data?: IProduct;
  galleryData?: string[];
};

const ProductItemDetail: React.FC<ProductItemDetailProps> = ({
  data: product,
  galleryData,
}: ProductItemDetailProps) => {
  const [api, setApi] = useState<CarouselApi>();

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex gap-8 flex-col lg:flex-row'>
        <div className='border-b-2 lg:border-b-0 lg:w-[70%]'>
          <div className='relative'>
            <div>
              {product?.isDiscounted && (
                <span className='absolute top-2 left-2 z-[5] rounded-md bg-red-500 px-2 py-1 text-lg font-medium text-white shadow-sm flex items-center justify-center h-15 w-20'>
                  Sale
                </span>
              )}
            </div>

            <Carousel
              opts={{
                align: 'center',
                loop: true,
              }}
              className='relative w-full'
              setApi={setApi}
            >
              <CarouselContent>
                {galleryData?.map((image, index) => (
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
                {galleryData?.map((image, index) => (
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
        <div className='md:space-y-6 lg:border-l lg:pl-8 lg:w-[30%]'>
          <div className='border-b pb-6 lg:mt-14'>
            <h1 className='text-3xl font-semibold mb-2'>{product?.name}</h1>
            <div>
              <p
                className={`text-sm font-medium  text-gray-500 ${
                  product?.isDiscounted ? 'line-through' : ''
                }`}
              >
                {product?.price
                  ? formatCurrency(product.price, 'USD', 'en-EN')
                  : 0}
              </p>
              {product?.isDiscounted && (
                <p className='text-2xl font-bold text-gray-900 '>
                  {product.discountPrice
                    ? formatCurrency(product.discountPrice, 'USD', 'en-EN')
                    : 0}
                </p>
              )}
            </div>
          </div>
          <div className='space-y-4 mt-4'>
            <h2 className='text-xl font-semibold'>Description</h2>
            <div className='text-gray-600 whitespace-pre-wrap'>
              <Viewer content={product?.description || ''} styling='prose' />
            </div>
          </div>
          {/* วิธีการชำระเงิน */}
          <div className='mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200'>
            <h2 className='text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2'>
              <span className='icon-[material-symbols-light--payments-outline] text-2xl text-blue-700' />
              Payment Methods
            </h2>
            <p className='text-gray-700 mb-4'>
              You can pay for your order using one of the following methods.{' '}
              <span className='font-semibold text-blue-800'>
                Please contact us directly
              </span>{' '}
              to receive payment details and instructions.
            </p>
            <div className='flex gap-6 items-end mb-4 justify-center'>
              <div className='flex flex-col items-center'>
                <Image
                  src='/payment/paypal.jpg'
                  alt='PayPal'
                  width={60}
                  height={60}
                  className='mb-1'
                />
                <span className='text-sm text-gray-700'>PayPal</span>
              </div>
              <div className='flex flex-col items-center'>
                <Image
                  src='/payment/money-gram.jpg'
                  alt='MoneyGram'
                  width={60}
                  height={60}
                  className='mb-1'
                />
                <span className='text-sm text-gray-700'>MoneyGram</span>
              </div>
              <div className='flex flex-col items-center'>
                <Image
                  src='/payment/remitly.jpg'
                  alt='Remitly'
                  width={60}
                  height={60}
                  className='mb-1'
                />
                <span className='text-sm text-gray-700'>Remitly</span>
              </div>
            </div>
            <ul className='list-disc pl-6 text-gray-700 mb-2'>
              <li>Let us know your preferred payment method.</li>
              <li>
                We will provide you with the account details and payment
                instructions.
              </li>
              <li>
                After payment, please send us the payment confirmation to
                complete your order.
              </li>
            </ul>
            <div className='mt-3 '>
              <span className='font-medium text-blue-800'>Contact us:</span>
              <ul className='pl-4 mt-1'>
                <li>
                  <a
                    href='https://m.me/kamolrat.saesong.3'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 underline'
                  >
                    Message us on Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductItemDetail };
