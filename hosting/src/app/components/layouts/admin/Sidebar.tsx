'use client';

import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

const menus = [
  {
    name: 'Dashboard',
    link: 'dashboard',
  },
  {
    name: 'Products',
    link: 'dashboard/product',
  },
  {
    name: 'Category',
    link: 'dashboard/category',
  },
  {
    name: 'Settings',
    link: 'dashboard/settings',
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };
  return (
    <aside
      className={
        'fixed left-0 top-0 z-40 w-64 h-screen transition-transform translate-x-0'
      }
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-white border-r pt-0'>
        <div className='h-[120px] pt-3'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={120}
              height={10}
              className='h-14 w-auto m-auto'
            />
          </Link>
        </div>

        <ul className='space-y-2 font-medium'>
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link
                href={'/' + menu.link}
                className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className='space-y-2 font-medium flex'>
          <span
            onClick={handleLogout}
            className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 
          cursor-pointer absolute bottom-0 w-[90%]'
          >
            Logout
          </span>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export { Sidebar };
