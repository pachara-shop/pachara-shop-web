'use client';

import { MobileMenu } from '@/components/molecules/mobileMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight * 0.05; // 20% of the window height

      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        setIsVisible(false);
      } else if (scrollTop < lastScrollTop) {
        setIsVisible(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white p-4 fixed top-0 left-0 w-full transition-transform duration-300 z-10 shadow-md backdrop-blur-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-4 absolute'>
          <span
            className='text-black text-xl font-bold cursor-pointer'
            onClick={() => router.push('/')}
          >
            Pachara Shop
          </span>
        </div>
        <div
          className='absolute right-4 md:hidden flex-1 justify-center'
          id='mobile'
        >
          <MobileMenu />
        </div>
        <div>
          <br />
        </div>
        <div className='flex-1 justify-end hidden md:flex' id='desktop'>
          <ul className='flex space-x-4 font-bold'>
            <li>
              <Link href='/'>หน้าแรก</Link>
            </li>
            <li>
              <Link href='/about' className='text-black'>
                เกี่ยวกับเรา
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
