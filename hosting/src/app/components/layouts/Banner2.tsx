import React from 'react';
const Banner2 = () => {
  return (
    <div className='w-full h-[800px] flex justify-center items-center'>
      <div className='w-full h-full overflow-hidden'>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2Fpexels-pixabay-157888.jpg?alt=media&token=beddb2d6-0055-4695-951f-ffb86c94825c'
          alt='Large Image'
          className='w-full h-full object-cover transform transition-transform duration-300 '
        />
      </div>
    </div>
  );
};
// hover:scale-105
export { Banner2 };
