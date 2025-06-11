import { Suspense } from 'react';
import NavBar from '../components/layouts/NavBar';
import { Footer } from './components/Footer';
import { ContentLoader } from './components/ContentLoader';

export const metadata = {
  title: 'Pachara Boutique | Hmong Bags & Accessories',
  description:
    'Discover unique Hmong bags, handmade accessories, and ethnic products from Pachara Boutique. Worldwide shipping. Contact us for custom orders.',
  keywords: [
    'Hmong bag',
    'Pachara Boutique',
    'Handmade',
    'Ethnic accessories',
    'Thailand',
    'Remitly',
    'MoneyGram',
    'PayPal',
    'Hmong handicraft',
    'Unique gifts',
  ],
  authors: [{ name: 'Pachara Boutique', url: 'https://pachara-shop.web.app' }],
  creator: 'Pachara Boutique',
  openGraph: {
    title: 'Pachara Boutique | Hmong Bags & Accessories',
    description:
      'Discover unique Hmong bags, handmade accessories, and ethnic products from Pachara Boutique. Worldwide shipping.',
    url: 'https://pachara-shop.web.app/',
    siteName: 'Pachara Boutique',
    images: [
      {
        url: 'https://pachara-shop.web.app/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Pachara Boutique Hmong Bags',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pachara Boutique | Hmong Bags & Accessories',
    description:
      'Discover unique Hmong bags, handmade accessories, and ethnic products from Pachara Boutique.',
    images: ['https://pachara-shop.web.app/logo.jpg'],
  },
};

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
      <main className='flex-1'>
        <div className='mt-24'>{children}</div>
      </main>
      <Footer socialIcons={socialIcons} />
    </Suspense>
  );
}
