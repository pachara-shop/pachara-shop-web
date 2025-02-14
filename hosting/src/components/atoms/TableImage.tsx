import Image from 'next/image';

export const TableImage = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      width={100}
      height={100}
      className='hover:scale-110 transition-transform cursor-pointer'
    />
  );
};
