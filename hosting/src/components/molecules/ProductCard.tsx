import { ICategory } from '@/shared/models/Category';
import { IProduct } from '@/shared/models/Product';
import Image from 'next/image';
import Link from 'next/link';
interface IProductCart {
  product: IProduct;
}
const ProductCart: React.FC<IProductCart> = ({ product }) => {
  return (
    <div className='flex flex-col transition-all duration-300 ease-in-out opacity-100 scale-100'>
      <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group'>
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
            className='object-cover transition-transform duration-300 group-hover:scale-110'
          />
        </Link>
      </div>
      <h3 className='mt-4 text-sm font-medium text-gray-900'>{product.name}</h3>
      <h4 className=' text-xs font-medium text-gray-900'>
        {(product.category as ICategory).name}
      </h4>
      <p className='mt-1 text-xs font-medium text-gray-700'>
        ฿{product.price.toLocaleString()}
      </p>
    </div>
  );
};

export { ProductCart };
