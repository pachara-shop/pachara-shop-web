const Banner = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-7/10 h-full overflow-hidden'>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2Fpexels-pixabay-157888.jpg?alt=media&token=beddb2d6-0055-4695-951f-ffb86c94825c'
          alt='Large Image'
          className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-105'
        />
      </div>
      <div className='w-3/10 h-full flex flex-col'>
        <div className='w-full h-1/2 overflow-hidden'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2F8809973774572_02_JPG_d4013c6e-da00-46cd-864a-03f564072f31.webp?alt=media&token=72b55e8e-b217-4864-b57f-793a6a9ee1f7'
            alt='Small Image 1'
            className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='w-full h-1/2 overflow-hidden'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/pachara-shop-dev.firebasestorage.app/o/banner%2Fjd_HR-2024-0206_a.webp?alt=media&token=954a89f0-1ca7-48f7-ac08-f4d6e47fbcfd'
            alt='Small Image 2'
            className='w-full h-full object-cover transform transition-transform duration-300 hover:scale-105'
          />
        </div>
      </div>
    </div>
  );
};

export { Banner };
