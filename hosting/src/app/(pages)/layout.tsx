import { Suspense } from 'react';
import NavBar from '../components/layouts/NavBar';
import { Footer } from '../components/layouts/Footer';

const ContentLoader = () => (
  <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
  </div>
);

async function getSocialIcons() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_PATH + '/be/settings/social-media',
    {
      cache: 'no-store', // ใช้ SSR ไม่มีการ cache,
      method: 'GET',
    }
  );
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socialIcons = await getSocialIcons();

  return (
    <Suspense fallback={<ContentLoader />}>
      <NavBar socialIcons={socialIcons} />
      <div className='mt-24'>{children}</div>
      <Footer socialIcons={socialIcons} />
    </Suspense>
  );
}
