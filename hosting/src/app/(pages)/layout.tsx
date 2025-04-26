import { Suspense } from 'react';
import NavBar from '../components/layouts/NavBar';
import { Footer } from '../components/layouts/Footer';

const ContentLoader = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='flex flex-col items-center space-y-4'>
      <div className='w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin'></div>
      <p className='text-xl font-medium text-gray-600'>loading...</p>
    </div>
  </div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<ContentLoader />}>
      <NavBar />
      <div className='mt-24'>{children}</div>
      <Footer />
    </Suspense>
  );
}
