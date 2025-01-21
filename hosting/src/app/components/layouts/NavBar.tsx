import React from 'react';
const NavBar = () => {
  return (
    <nav className='bg-primary p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-4 absolute'>
          <img src='/path/to/logo.png' alt='Logo' className='h-8' />
          <span className='text-white text-xl'>Pachara Shop</span>
        </div>
        <div className='flex-1 flex justify-center'>
          <ul className='flex space-x-4'>
            <li>
              <a href='/' className='text-white'>
                Home
              </a>
            </li>
            <li>
              <a href='/about' className='text-white'>
                About
              </a>
            </li>
            <li>
              <a href='/contact' className='text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
