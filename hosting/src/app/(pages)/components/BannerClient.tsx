'use client';

import { useGetSettingBannerQuery } from '@/hooks/slices/fe/settingAPI';
import { Banner } from './Banner';

const BannerClient = () => {
  const { data } = useGetSettingBannerQuery();
  return <Banner banners={data?.data} />;
};
export { BannerClient };
