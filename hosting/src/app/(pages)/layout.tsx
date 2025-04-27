import { Suspense } from 'react';
import NavBar from '../components/layouts/NavBar';
import { Footer } from '../components/layouts/Footer';

const ContentLoader = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
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
