'use client';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const { t } = useTranslation('common');
  console.log(t('home'));
  const router = useRouter();
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeLanguage = (lang) => {
    const currentPath = window.location.pathname;
    const currentQuery = window.location.search;
    router.push(`/${lang}${currentPath}${currentQuery}`);
    setIsDropdownOpen(false);
  };

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
              <a href='/' className='text-black'>
                {t('home')}
              </a>
            </li>
            <li>
              <a href='/about' className='text-black'>
                About
              </a>
            </li>
            <li>
              <a href='/contact' className='text-black'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='text-black font-bold focus:outline-none'
          >
            Language
          </button>
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-20 bg-white border border-gray-200 rounded shadow-lg'>
              <a
                href='#'
                onClick={() => changeLanguage('en')}
                className='block px-4 py-2 text-black hover:bg-gray-100'
              >
                English
              </a>
              <a
                href='#'
                onClick={() => changeLanguage('th')}
                className='block px-4 py-2 text-black hover:bg-gray-100'
              >
                ไทย
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
