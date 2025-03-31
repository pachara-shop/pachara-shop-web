import { Banner } from '@/app/(pages)/components/banner/Banner';
import { SettingBanner } from '@/shared/models/Settings';

const BannerContainer = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + '/fe/settings/banner',
      {
        method: 'GET',
        cache: 'no-store',
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
