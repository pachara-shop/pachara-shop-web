import { formatCurrency } from '@/lib/utils';
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
        <div>
          {product.isDiscounted && (
            <span className='absolute top-2 left-2 z-10 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white shadow-sm'>
              Sale
            </span>
          )}
        </div>
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
      <div className='flex items-center mt-2 gap-2'>
        <p
          className={`mt-1 text-xs font-medium text-gray-700 ${
            product.isDiscounted ? 'line-through' : ''
          }`}
        >
          {product.price ? formatCurrency(product.price, 'THB', 'th-TH') : 0}
        </p>
        {product.isDiscounted && (
          <p className='mt-1 text-xs font-medium text-gray-500'>
            {product.discountPrice
              ? formatCurrency(product.discountPrice, 'THB', 'th-TH')
              : 0}
          </p>
        )}
      </div>
    </div>
  );
};

export { ProductCart };
