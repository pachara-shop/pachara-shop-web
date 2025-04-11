'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

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
interface sidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<sidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className='fixed left-4 bottom-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
        aria-label='Show menu'
      >
        <Menu size={20} />
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        } ${isCollapsed ? 'w-0' : 'w-64'}`}
      >
        <div className='h-full py-4 overflow-y-auto bg-white border-r pt-0'>
          <div className='h-[120px] pt-3 flex justify-between items-center'>
            <Link href='/' className='flex-grow flex justify-center'>
              <Image
                src='/logo.jpg'
                alt='Logo'
                width={120}
                height={10}
                className='h-14 w-auto'
              />
            </Link>
          </div>

          <ul className='space-y-2 font-medium ml-4'>
            {menus.map((menu) => (
              <li key={menu.name}>
                <Link
                  href={'/' + menu.link}
                  className={
                    'flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 ' +
                    (pathname === '/' + menu.link ? ' bg-gray-100' : '')
                  }
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* ปรับพื้นที่เนื้อหาหลักเมื่อ sidebar ถูกซ่อน/แสดง */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? 'ml-0' : 'ml-64'
        }`}
      >
        {/* นี่คือพื้นที่สำหรับ content หลักที่ต้องเพิ่มใน Layout component */}
      </div>
    </>
  );
};

// ปรับปรุง PropTypes (isSidebarOpen ไม่ได้ใช้แล้ว)
Sidebar.propTypes = {};

export { Sidebar };
