'use client';

import { useAuth } from '@/context/AuthContext';
import { RootState } from '@/hooks/store';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Header = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter();
  const { currentUser, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { title, subTitle } = useSelector(
    (state: RootState) => state.layout.header
  );

  // ฟังก์ชันสำหรับ logout
  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  // ปิด dropdown เมื่อคลิกด้านนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`flex items-center justify-between bg-white h-[120px] pr-12 fixed top-0 z-50 pl-14 
    transition-all duration-300 ease-in-out
    ${isCollapsed ? 'ml-0 w-full' : 'w-[calc(100%-16rem)] ml-64'}`}
    >
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>{title ?? ''}</h1>
        <p className='text-gray-500'>{subTitle}</p>
      </div>

      <div className='relative inline-block text-left'>
        <div
          ref={triggerRef}
          className='flex items-center cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
            <User size={20} />
          </div>
          <span className='ml-2'>{currentUser?.email}</span>
          <ChevronDown size={16} className='ml-2' />
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            style={{ right: 0 }} // ปรับตำแหน่งด้วย inline style
            className='absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[1000] border overflow-visible'
          >
            <button
              className='flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
              onClick={handleLogout}
            >
              <LogOut size={16} className='mr-2' />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
