import { SettingsRepository } from '@/repositories/SettingsRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
const getBanner = async () => {
  try {
    const repo = new SettingsRepository();
    const banners = await repo.getSettingBanners();
    return handleSuccess({ data: banners });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getBanner;
