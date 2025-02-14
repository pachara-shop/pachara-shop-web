import PropTypes from 'prop-types';
import Image from 'next/image';

const menus = [
  {
    name: 'Dashboard',
    link: '#',
  },
  {
    name: 'Products',
    link: 'manage/product',
  },
  {
    name: 'Category',
    link: 'manage/category',
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      className={
        'fixed left-0 top-0 z-40 w-64 h-screen transition-transform translate-x-0'
      }
    >
      <div className='h-full px-3 py-4 overflow-y-auto bg-white border-r pt-0'>
        <div className='h-[120px] pt-3'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={120}
            height={10}
            className='h-14 w-auto m-auto'
          />
        </div>

        <ul className='space-y-2 font-medium'>
          {menus.map((menu) => (
            <li key={menu.name}>
              <a
                href={'/' + menu.link}
                className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100'
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export { Sidebar };
