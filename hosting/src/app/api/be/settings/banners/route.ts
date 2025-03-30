import { SettingsRepository } from '@/repositories/SettingsRepository';
import { withAuth } from '@/utils/api/request-handle';
import { handleError, handleSuccess } from '@/utils/api/response-handler';

const getBannerSettings = async () => {
  try {
    const repo = new SettingsRepository();
    const banners = await repo.getSettingBanners();
    return handleSuccess({ data: banners });
  } catch (err) {
    return handleError(500, err);
  }
};

const addBannerSettings = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return handleError(400, 'File is required');
    }
    const repo = new SettingsRepository();
    await repo.addBanner(file);
    return handleSuccess({ data: 'Banner added successfully' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = withAuth(getBannerSettings);
export const POST = withAuth(addBannerSettings);
