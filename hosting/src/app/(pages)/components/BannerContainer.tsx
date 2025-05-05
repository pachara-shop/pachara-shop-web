// 'use client';

import { Banner } from '@/app/(pages)/components/Banner';
import { SettingBanner } from '@/shared/models/Settings';

const BannerContainer = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + '/fe/settings/banner',
      {
        cache: 'force-cache', // เก็บ cache ไว้
        next: { revalidate: 3600 }, // revalidate ทุก 1 ชั่วโมง
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch banners:', response.statusText);
      return <Banner banners={[]} />;
    }

    const jsonResponse = await response.json();
    const banners = jsonResponse.data as SettingBanner[];

    return <Banner banners={banners} />;
  } catch (error) {
    console.error('Error loading banners:', error);
    return <Banner banners={[]} />;
  }
};

export { BannerContainer };
