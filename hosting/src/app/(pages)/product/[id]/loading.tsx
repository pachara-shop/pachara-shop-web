import { Skeleton } from '@/components/atoms/skeleton';

export default function LoadingPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex gap-8 flex-col lg:flex-row'>
        {/* gallery */}
        <div className='border-b-2 lg:border-b-0 lg:w-[70%]'>
          <div className='relative'>
            <Skeleton className='h-[700px]' />
            <Skeleton className='h-16 mt-4' />
          </div>
        </div>
        {/* detail */}
        <div className='md:space-y-6 lg:border-l lg:pl-8 h-svh lg:w-[30%]'>
          <div className='border-b pb-6 lg:mt-14'>
            <h1 className='text-3xl font-semibold mb-2'>
              <Skeleton className='h-8' />
            </h1>
            <Skeleton className='h-8' />
          </div>
          <div className='space-y-4 mt-4'>
            <h2 className='text-xl font-semibold'>รายละเอียดสินค้า</h2>
            <Skeleton className='h-8' />
          </div>
        </div>
      </div>
    </div>
  );
}
