import Image from 'next/image';

interface TableImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

export const TableImage = ({ src, alt, ...props }: TableImageProps) => {
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
