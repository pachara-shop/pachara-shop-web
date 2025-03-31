'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SettingBanner } from '@/shared/models/Settings';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerProps {
  banners?: SettingBanner[];
}

const Banner: React.FC<BannerProps> = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const defaultBanner =
    'https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2Fpexels-pixabay-157888.jpg?alt=media&token=beddb2d6-0055-4695-951f-ffb86c94825c';

  // ใช้ banners จาก props หรือ defaultBanner ถ้าไม่มีข้อมูล
  const images =
    banners.length > 0 ? banners.map((banner) => banner.url) : [defaultBanner];

  // เลื่อนภาพอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className='w-full flex justify-center '>
      <div className='relative w-full  h-[350px] md:h-[500px] overflow-hidden '>
        {/* Carousel images */}
        <div className='w-full h-full relative'>
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                sizes='100vw'
                className='object-cover'
              />
            </div>
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={goToPrevious}
          className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10'
          aria-label='Previous image'
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10'
          aria-label='Next image'
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator dots */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Banner };
