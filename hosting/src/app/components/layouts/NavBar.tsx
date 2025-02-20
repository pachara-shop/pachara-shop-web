'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight * 0.2; // 20% of the window height

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
      className={`bg-white p-4 fixed top-0 left-0 w-full transition-transform duration-300 z-10 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-4 absolute'>
          <span className='text-black text-xl font-bold'>Pachara Shop</span>
        </div>
        <div className='flex-1 flex justify-center'>
          <ul className='flex space-x-4 font-bold'>
            <li>
              <Link href='/'>หน้าแรก</Link>
            </li>
            <li>
              <Link href='/about' className='text-black'>
                เกี่ยวกับเรา
              </Link>
            </li>
            {/* <li>
              <Link href='/contact' className='text-black'>
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
        <div className='relative'>
          {/* <button className='text-black font-bold focus:outline-none'>
            Search
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
