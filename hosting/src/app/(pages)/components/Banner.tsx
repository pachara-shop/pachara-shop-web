'use client';

import React from 'react';
import Image from 'next/image';
import { SettingBanner } from '@/shared/models/Settings';
import { Title } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerProps {
  banners?: SettingBanner[];
}

const Banner: React.FC<BannerProps> = ({ banners = [] }) => {
  const router = useRouter();

  const defaultBanner =
    'https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2Fpexels-pixabay-157888.jpg?alt=media&token=beddb2d6-0055-4695-951f-ffb86c94825c';

  const images =
    banners.length > 0 ? banners.map((banner) => banner.url) : [defaultBanner];

  return (
    <div className='w-full'>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          enabled: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='h-[350px] md:h-[500px]'
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full h-full'>
              <div className='absolute inset-0 bg-black/20 z-10 flex items-center justify-center'>
                <div className='h-[150px] w-[280px] sm:h-[180px] sm:w-[350px] lg:h-[200px] lg:w-[450px] bg-red-400 bg-opacity-75 rounded-sm items-center justify-center flex flex-col'>
                  <Button
                    onClick={() => router.push('/shop')}
                    className='p-3 sm:p-4 lg:p-6 rounded-full transform hover:scale-105 transition-transform cursor-pointer'
                  >
                    <Title className='text-white text-lg sm:text-xl lg:text-3xl font-bold'>
                      SHOP NOW
                    </Title>
                  </Button>
                </div>
              </div>
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes='100vw'
                className='object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { Banner };
